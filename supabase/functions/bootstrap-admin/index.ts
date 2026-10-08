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

function secureEquals(left: string, right: string) {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  let mismatch = a.length ^ b.length;
  const length = Math.max(a.length, b.length);
  for (let index = 0; index < length; index += 1) mismatch |= (a[index] || 0) ^ (b[index] || 0);
  return mismatch === 0;
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return jsonResponse({ error: '仅支持 POST 请求。' }, 405);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceRoleKey = String(getSecretKey());
  const bootstrapCode = Deno.env.get('ADMIN_BOOTSTRAP_CODE');
  if (!supabaseUrl || !serviceRoleKey || !bootstrapCode) return jsonResponse({ error: '后台服务尚未完成配置。' }, 503);

  let payload: { email?: string; password?: string; accessCode?: string };
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: '请求内容格式不正确。' }, 400);
  }

  const email = String(payload.email || '').trim().toLowerCase();
  const password = String(payload.password || '');
  const accessCode = String(payload.accessCode || '');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return jsonResponse({ error: '请输入有效的管理员邮箱。' }, 400);
  if (password.length < 8) return jsonResponse({ error: '登录密码至少需要 8 位。' }, 400);

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { count, error: countError } = await admin
    .from('admin_profiles')
    .select('id', { count: 'exact', head: true });
  if (countError) return jsonResponse({ error: '无法检查管理员状态，请确认数据库脚本已执行。' }, 500);
  if ((count || 0) > 0) return jsonResponse({ error: '首次开通入口已经关闭，请让现有管理员发送邀请。' }, 409);
  if (!secureEquals(accessCode, bootstrapCode)) return jsonResponse({ error: '首次开通凭证不正确。' }, 403);

  const { error: lockError } = await admin.from('admin_bootstrap_lock').insert({ singleton: true });
  if (lockError) return jsonResponse({ error: '首次开通入口已经关闭，请让现有管理员发送邀请。' }, 409);

  const { data: created, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { role: 'admin' },
  });
  if (createError || !created.user) {
    await admin.from('admin_bootstrap_lock').delete().eq('singleton', true);
    return jsonResponse({ error: createError?.message || '管理员账号创建失败。' }, 400);
  }

  const { error: profileError } = await admin.from('admin_profiles').insert({
    id: created.user.id,
    email,
    active: true,
    must_change_password: false,
  });
  if (profileError) {
    await admin.auth.admin.deleteUser(created.user.id);
    await admin.from('admin_bootstrap_lock').delete().eq('singleton', true);
    return jsonResponse({ error: '管理员权限创建失败，请重试。' }, 500);
  }

  return jsonResponse({ success: true });
});
