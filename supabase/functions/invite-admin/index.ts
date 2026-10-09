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

function loginEmail(phone: string) {
  return `admin-${phone}@founder-ip.local`;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: '仅支持 POST 请求。' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = String(getSecretKey());
  const sharedPassword = Deno.env.get('ADMIN_SHARED_PASSWORD');
  if (!supabaseUrl || !serviceRoleKey || !sharedPassword) return jsonResponse({ error: '邀请服务尚未完成配置。' }, 503);

  const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  if (!token) return jsonResponse({ error: '请先登录管理员账号。' }, 401);

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData.user) return jsonResponse({ error: '登录状态已失效，请重新登录。' }, 401);

  const { data: profile } = await admin.from('admin_profiles').select('id,active').eq('id', userData.user.id).maybeSingle();
  if (!profile?.active) return jsonResponse({ error: '当前账号没有邀请管理员的权限。' }, 403);

  let body: { phone?: string };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: '请求内容格式不正确。' }, 400);
  }
  const phone = String(body.phone || '').trim();
  if (!/^1\d{10}$/.test(phone)) return jsonResponse({ error: '请输入正确的 11 位手机号。' }, 400);

  const { data: existing } = await admin.from('admin_profiles').select('id').eq('phone', phone).maybeSingle();
  if (existing) return jsonResponse({ error: '该手机号已经是管理员。' }, 409);

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email: loginEmail(phone), password: sharedPassword, email_confirm: true,
    user_metadata: { role: 'admin', phone },
  });
  if (createError || !created.user) return jsonResponse({ error: createError?.message || '管理员开通失败。' }, 400);

  const { error: profileError } = await admin.from('admin_profiles').insert({
    id: created.user.id, email: loginEmail(phone), phone, active: true,
    must_change_password: false, invited_by: userData.user.id,
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    return jsonResponse({ error: '管理员权限写入失败，请稍后重试。' }, 500);
  }

  return jsonResponse({ success: true });
});
