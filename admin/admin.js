(() => {
  const config = window.APP_CONFIG || {};
  const publicKey = config.supabasePublishableKey || config.supabaseAnonKey;
  const configured = Boolean(config.supabaseUrl && publicKey && window.supabase);
  const client = configured ? window.supabase.createClient(config.supabaseUrl, publicKey) : null;
  const state = { submissions: [], filtered: [], selectedId: null, admin: null };
  const sharedAdminEmail = 'dashboard-access@founder-ip.local';

  const $ = (id) => document.getElementById(id);
  const panels = ['setupPanel', 'authPanel', 'dashboard'];
  const setPanel = (id) => panels.forEach((panel) => $(panel).classList.toggle('hidden', panel !== id));
  const setMessage = (id, text = '', isError = false) => {
    const el = $(id);
    el.textContent = text;
    el.classList.toggle('error', isError);
  };
  const setBusy = (form, busy) => {
    const button = form.querySelector('button[type="submit"]');
    if (button) button.disabled = busy;
  };
  const formatDate = (value, withTime = true) => {
    if (!value) return '—';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '—';
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {})
    }).format(date);
  };

  function closeDialog(id) {
    const dialog = $(id);
    if (dialog?.open) dialog.close();
  }

  async function ensureAdmin(user) {
    const { data, error } = await client
      .from('admin_profiles')
      .select('id,email,phone,display_name,active')
      .eq('id', user.id)
      .maybeSingle();
    if (error || !data?.active) return null;
    return data;
  }

  async function handleSession(session) {
    if (!session?.user) {
      state.admin = null;
      setPanel('authPanel');
      return;
    }
    const profile = await ensureAdmin(session.user);
    if (!profile) {
      await client.auth.signOut();
      setPanel('authPanel');
      setMessage('authMessage', '这个账号没有管理员权限，请联系现有管理员发送邀请。', true);
      return;
    }
    state.admin = profile;
    setPanel('dashboard');
    await loadSubmissions();
  }

  async function loadSubmissions() {
    setMessage('dashboardMessage', '正在读取测评记录…');
    const { data, error } = await client
      .from('assessment_submissions')
      .select('*')
      .order('submitted_at', { ascending: false })
      .limit(2000);
    if (error) {
      setMessage('dashboardMessage', `读取失败：${error.message}`, true);
      return;
    }
    state.submissions = data || [];
    applyFilters();
    renderStats();
    setMessage('dashboardMessage');
  }

  function applyFilters() {
    const query = $('searchInput').value.trim().toLowerCase();
    state.filtered = state.submissions.filter((item) => {
      const intake = item.intake_profile && typeof item.intake_profile === 'object' ? item.intake_profile : {};
      const haystack = [item.student_name, item.student_contact, item.group_name, intake.account_name].filter(Boolean).join(' ').toLowerCase();
      return !query || haystack.includes(query);
    });
    renderRows();
  }

  function renderRows() {
    const body = $('submissionRows');
    body.innerHTML = state.filtered.map((item) => studentCard(item)).join('');
    $('recordCount').textContent = `显示 ${state.filtered.length} / ${state.submissions.length} 条`;
    $('emptyState').classList.toggle('hidden', state.filtered.length > 0);
  }

  function renderStats() {
    $('totalCount').textContent = String(state.submissions.length);
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    $('todayCount').textContent = String(state.submissions.filter((item) => {
      const date = new Date(item.submitted_at);
      return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}` === todayKey;
    }).length);
    $('latestGroup').textContent = state.submissions[0]?.group_name || '未分组';
  }

  function answerValue(item, question) {
    const answer = (Array.isArray(item.answers_detail) ? item.answers_detail : []).find((entry) => entry.question === question);
    if (!answer) return '—';
    return Array.isArray(answer.answers) ? answer.answers.join('、') : (answer.answer || answer.selected || '—');
  }

  function infoItem(label, value) {
    return `<div class="student-info"><span>${escapeHtml(label)}</span><strong>${escapeHtml(value || '—')}</strong></div>`;
  }

  function studentCard(item) {
    const intake = item.intake_profile && typeof item.intake_profile === 'object' ? item.intake_profile : {};
    const hasAccount = intake.has_account;
    return `<article class="student-card">
      <header class="student-card-head"><div><h2>${escapeHtml(item.student_name || '未填写姓名')}</h2><p>${escapeHtml(item.student_contact || '未留手机号')} · ${escapeHtml(formatDate(item.submitted_at))}</p></div><span class="group-tag">${escapeHtml(item.group_name || '未分组')}</span></header>
      <div class="student-info-grid">
        ${infoItem('用户性别', answerValue(item, '你的用户性别主要是？'))}
        ${infoItem('用户年龄', answerValue(item, '你的用户年龄主要是？'))}
        ${infoItem('用户职业', answerValue(item, '你的用户职业主要是？'))}
        ${infoItem('用户收入', answerValue(item, '你的用户收入水平主要是？'))}
        ${infoItem('本人年收入', intake.annual_income || '—')}
        ${infoItem('短视频经历', hasAccount ? '拍过' : '还没有')}
        ${hasAccount ? infoItem('账号名称', intake.account_name || '—') : ''}
        ${hasAccount ? infoItem('粉丝数量', intake.followers || '—') : ''}
        ${hasAccount ? infoItem('短视频数量', intake.video_count || '—') : ''}
      </div>
      ${hasAccount ? `<div class="student-focus"><span>账号卡点</span><p>${escapeHtml((intake.bottlenecks || []).join('、') || '—')}</p><span>拍摄目的</span><p>${escapeHtml((intake.reasons || []).join('、') || '—')}</p><span>直播情况</span><p>${escapeHtml(`${intake.has_live ? '直播过' : '未直播'}${intake.live_issues ? ` · ${intake.live_issues}` : ''}`)}</p></div>` : ''}
      <footer><button class="result-button" type="button" data-detail-id="${escapeHtml(item.id)}">查看学员测评结果 <span>→</span></button></footer>
    </article>`;
  }

  function openDetail(id) {
    const item = state.submissions.find((entry) => entry.id === id);
    if (!item) return;
    state.selectedId = id;
    $('detailTitle').textContent = item.student_name || '学员详情';
    const support = Array.isArray(item.support_emotions) ? item.support_emotions.join('、') : '—';
    const avoid = Array.isArray(item.avoid_emotions) ? item.avoid_emotions.join('、') : '—';
    const scoreEntries = Object.entries(item.emotion_scores || {}).sort((a, b) => Number(b[1]) - Number(a[1]));
    const intake = item.intake_profile && typeof item.intake_profile === 'object' ? item.intake_profile : {};
    $('detailContent').innerHTML = `
      <div class="detail-summary">
        ${summaryItem('主情绪', item.primary_emotion || '—')}
        ${summaryItem('辅助情绪', support)}
        ${summaryItem('需要规避', avoid)}
        ${summaryItem('外在风格', item.appearance_style || '—')}
      </div>
      <section class="detail-section"><h3>情绪维度</h3><div class="score-list">${scoreEntries.map(([name, score]) => `<span>${escapeHtml(name)}：${escapeHtml(score)}</span>`).join('') || '<span>暂无</span>'}</div></section>`;
    $('detailDialog').showModal();
  }

  function summaryItem(label, value) {
    return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  $('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(form, true);
    setMessage('authMessage', '正在登录…');
    const password = $('loginPassword').value.trim();
    const { error } = await client.auth.signInWithPassword({ email: sharedAdminEmail, password });
    if (error) setMessage('authMessage', '密码不正确，请重新输入。', true);
    setBusy(form, false);
  });

  $('inviteForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setBusy(form, true);
    const phone = $('invitePhone').value.trim();
    if (!/^1\d{10}$/.test(phone)) { setMessage('inviteMessage', '请输入正确的 11 位手机号。', true); return; }
    setMessage('inviteMessage', '正在开通…');
    const { data, error } = await client.functions.invoke('invite-admin', { body: { phone } });
    if (error || data?.error) setMessage('inviteMessage', `邀请失败：${data?.error || error.message}`, true);
    else {
      setMessage('inviteMessage', '管理员已开通，可使用手机号和统一密码登录。');
      form.reset();
    }
    setBusy(form, false);
  });

  $('deleteSubmissionButton').addEventListener('click', async () => {
    if (!state.selectedId || !confirm('确定删除这条学员测评记录吗？删除后无法恢复。')) return;
    const button = $('deleteSubmissionButton');
    button.disabled = true;
    const { error } = await client.from('assessment_submissions').delete().eq('id', state.selectedId);
    button.disabled = false;
    if (error) return alert(`删除失败：${error.message}`);
    closeDialog('detailDialog');
    await loadSubmissions();
  });

  $('submissionRows').addEventListener('click', (event) => {
    const button = event.target.closest('[data-detail-id]');
    if (button) openDetail(button.dataset.detailId);
  });
  $('searchInput').addEventListener('input', applyFilters);
  $('refreshButton').addEventListener('click', loadSubmissions);
  $('inviteButton').addEventListener('click', () => { setMessage('inviteMessage'); $('inviteDialog').showModal(); });
  document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => closeDialog(button.dataset.closeDialog)));
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  }));

  async function init() {
    if (!configured) return setPanel('setupPanel');
    const { data } = await client.auth.getSession();
    await handleSession(data.session);
    client.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'PASSWORD_RECOVERY') {
        window.setTimeout(() => handleSession(session), 0);
      }
    });
  }

  init();
})();
