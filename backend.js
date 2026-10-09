(function () {
  const config = window.APP_CONFIG || {};
  const publicKey = config.supabasePublishableKey || config.supabaseAnonKey;
  const previewMode = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const configured = Boolean(
    config.supabaseUrl &&
    publicKey &&
    !config.supabaseUrl.includes('YOUR_') &&
    ['http:', 'https:'].includes(window.location.protocol) &&
    window.supabase
  );
  const client = configured
    ? window.supabase.createClient(config.supabaseUrl, publicKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
      })
    : null;

  async function saveSubmission(payload) {
    if (!client) return { saved: false, reason: 'not_configured' };
    const id = payload.id || crypto.randomUUID();
    if (previewMode) return { saved: true, id, preview: true };
    const { error } = await client.from('assessment_submissions').insert({ ...payload, id });
    if (error?.code === '23505') return { saved: true, id, duplicate: true };
    if (error) throw error;
    return { saved: true, id };
  }

  window.AssessmentBackend = Object.freeze({ configured, client, saveSubmission });
})();
