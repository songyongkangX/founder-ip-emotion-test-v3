import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders, jsonResponse } from '../_shared/cors.ts';

function getSecretKey() {
  const legacyKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (legacyKey) return legacyKey;
  try {
    const keys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}');
    return keys.default || Object.values(keys)[0] || '';
  } catch {
    return '';
  }
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: '仅支持 POST 请求。' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = String(getSecretKey());
  const redirectUrl = Deno.env.get('ADMIN_REDIRECT_URL');
  if (!supabaseUrl || !serviceRoleKey || !redirectUrl) return jsonResponse({ error: '邀请服务尚未完成配置。' }, 503);

  const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return jsonResponse({ error: '请先登录管理员账号。' }, 401);

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData.user) return jsonResponse({ error: '登录状态已失效，请重新登录。' }, 401);

  const { data: profile } = await admin
    .from('admin_profiles')
    .select('id,active')
    .eq('id', userData.user.id)
    .maybeSingle();
  if (!profile?.active) return jsonResponse({ error: '当前账号没有邀请管理员的权限。' }, 403);

  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: '请求内容格式不正确。' }, 400);
  }
  const email = String(body.email || '').trim().toLowerCase();
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return jsonResponse({ error: '请输入有效的管理员邮箱。' }, 400);

  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    redirectTo: redirectUrl,
    data: { role: 'admin' },
  });
  if (inviteError || !invited.user) return jsonResponse({ error: inviteError?.message || '邀请发送失败。' }, 400);

  const { error: profileError } = await admin.from('admin_profiles').upsert({
    id: invited.user.id,
    email,
    active: true,
    must_change_password: true,
    invited_by: userData.user.id,
  }, { onConflict: 'id' });
  if (profileError) return jsonResponse({ error: '邀请已发送，但管理员权限写入失败，请稍后重试。' }, 500);

  return jsonResponse({ success: true });
});
