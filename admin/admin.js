(() => {
  const config = window.APP_CONFIG || {};
  const publicKey = config.supabasePublishableKey || config.supabaseAnonKey;
  const configured = Boolean(config.supabaseUrl && publicKey && window.supabase);
  const client = configured ? window.supabase.createClient(config.supabaseUrl, publicKey) : null;
  const state = { submissions: [], filtered: [], selectedId: null, admin: null };

  const $ = (id) => document.getElementById(id);
  const panels = ['setupPanel', 'authPanel', 'passwordPanel', 'dashboard'];
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
      .select('id,email,display_name,active,must_change_password')
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
    if (profile.must_change_password) {
      setPanel('passwordPanel');
      return;
    }
    $('adminIdentity').textContent = profile.display_name || profile.email || session.user.email || '';
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
    populateFilters();
    applyFilters();
    renderStats();
    setMessage('dashboardMessage');
  }

  function populateFilters() {
    const emotion = $('emotionFilter').value;
    const mbti = $('mbtiFilter').value;
    const emotions = [...new Set(state.submissions.map((item) => item.primary_emotion).filter(Boolean))].sort();
    const mbtis = [...new Set(state.submissions.map((item) => item.mbti_type).filter(Boolean))].sort();
    $('emotionFilter').innerHTML = '<option value="">全部主情绪</option>' + emotions.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join('');
    $('mbtiFilter').innerHTML = '<option value="">全部 MBTI</option>' + mbtis.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join('');
    $('emotionFilter').value = emotions.includes(emotion) ? emotion : '';
    $('mbtiFilter').value = mbtis.includes(mbti) ? mbti : '';
  }

  function applyFilters() {
    const query = $('searchInput').value.trim().toLowerCase();
    const emotion = $('emotionFilter').value;
    const mbti = $('mbtiFilter').value;
    state.filtered = state.submissions.filter((item) => {
      const haystack = [item.student_name, item.student_contact, item.group_name].filter(Boolean).join(' ').toLowerCase();
      return (!query || haystack.includes(query)) && (!emotion || item.primary_emotion === emotion) && (!mbti || item.mbti_type === mbti);
    });
    renderRows();
  }

  function renderRows() {
    const body = $('submissionRows');
    body.innerHTML = state.filtered.map((item) => `
      <tr>
        <td class="person-cell"><strong>${escapeHtml(item.student_name || '未填写')}</strong><span>${escapeHtml(item.student_contact || '无联系方式')}</span></td>
        <td>${escapeHtml(item.group_name || '—')}</td>
        <td>${escapeHtml(formatDate(item.submitted_at))}</td>
        <td><span class="tag">${escapeHtml(item.primary_emotion || '—')}</span></td>
        <td>${escapeHtml(item.mbti_type || '—')}</td>
        <td>${escapeHtml(item.appearance_style || '—')}</td>
        <td><button class="row-action" type="button" data-detail-id="${escapeHtml(item.id)}">查看</button></td>
      </tr>`).join('');
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
    const emotionCounts = state.submissions.reduce((counts, item) => {
      if (item.primary_emotion) counts[item.primary_emotion] = (counts[item.primary_emotion] || 0) + 1;
      return counts;
    }, {});
    const top = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0];
    $('topEmotion').textContent = top ? top[0] : '—';
    $('latestTime').textContent = state.submissions[0] ? formatDate(state.submissions[0].submitted_at, false) : '—';
  }

  function openDetail(id) {
    const item = state.submissions.find((entry) => entry.id === id);
    if (!item) return;
    state.selectedId = id;
    $('detailTitle').textContent = item.student_name || '学员详情';
    const support = Array.isArray(item.support_emotions) ? item.support_emotions.join('、') : '—';
    const avoid = Array.isArray(item.avoid_emotions) ? item.avoid_emotions.join('、') : '—';
    const scoreEntries = Object.entries(item.emotion_scores || {}).sort((a, b) => Number(b[1]) - Number(a[1]));
    const answers = Array.isArray(item.answers_detail) ? item.answers_detail : [];
    $('detailContent').innerHTML = `
      <div class="detail-summary">
        ${summaryItem('联系方式', item.student_contact || '—')}
        ${summaryItem('学员分组', item.group_name || '—')}
        ${summaryItem('提交时间', formatDate(item.submitted_at))}
        ${summaryItem('主情绪', item.primary_emotion || '—')}
        ${summaryItem('辅助情绪', support)}
        ${summaryItem('需要规避', avoid)}
        ${summaryItem('MBTI', item.mbti_type || '—')}
        ${summaryItem('外在风格', item.appearance_style || '—')}
        ${summaryItem('测评版本', item.test_version || '—')}
      </div>
      <section class="detail-section"><h3>情绪得分</h3><div class="score-list">${scoreEntries.map(([name, score]) => `<span>${escapeHtml(name)}：${escapeHtml(score)}</span>`).join('') || '<span>暂无</span>'}</div></section>
      <section class="detail-section"><h3>完整答题记录</h3><ol class="answer-list">${answers.map((answer, index) => `<li><strong>${index + 1}. ${escapeHtml(answer.question || '')}</strong><span>${escapeHtml(Array.isArray(answer.answers) ? answer.answers.join('、') : (answer.answer || answer.selected || '未作答'))}</span></li>`).join('') || '<li><span>暂无答题明细</span></li>'}</ol></section>`;
    $('detailDialog').showModal();
  }

  function summaryItem(label, value) {
    return `<div><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong></div>`;
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function csvCell(value) {
    let safeValue = String(value ?? '');
    if (/^[=+\-@]/.test(safeValue)) safeValue = `'${safeValue}`;
    return `"${safeValue.replace(/"/g, '""')}"`;
  }

  function exportCsv() {
    if (!state.filtered.length) return setMessage('dashboardMessage', '当前没有可导出的记录。', true);
    const headers = ['姓名', '联系方式', '分组', '提交时间', '主情绪', '辅助情绪', '需要规避', 'MBTI', '外在风格', '情绪得分', '完整答案'];
    const rows = state.filtered.map((item) => [
      item.student_name, item.student_contact, item.group_name, formatDate(item.submitted_at), item.primary_emotion,
      (item.support_emotions || []).join('、'), (item.avoid_emotions || []).join('、'), item.mbti_type, item.appearance_style,
      JSON.stringify(item.emotion_scores || {}), JSON.stringify(item.answers_detail || [])
    ]);
    const csv = '\ufeff' + [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `学员测评-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  $('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    setBusy(event.currentTarget, true);
    setMessage('authMessage', '正在登录…');
    const { error } = await client.auth.signInWithPassword({ email: $('loginEmail').value.trim(), password: $('loginPassword').value });
    if (error) setMessage('authMessage', '登录失败，请检查邮箱和密码。', true);
    setBusy(event.currentTarget, false);
  });

  $('bootstrapForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    if ($('bootstrapPassword').value !== $('bootstrapPasswordConfirm').value) return setMessage('authMessage', '两次输入的密码不一致。', true);
    setBusy(event.currentTarget, true);
    setMessage('authMessage', '正在开通首位管理员…');
    try {
      const response = await fetch(`${config.supabaseUrl}/functions/v1/bootstrap-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: publicKey },
        body: JSON.stringify({ email: $('bootstrapEmail').value.trim(), password: $('bootstrapPassword').value, accessCode: $('bootstrapCode').value })
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || '首次开通失败');
      const { error } = await client.auth.signInWithPassword({ email: $('bootstrapEmail').value.trim(), password: $('bootstrapPassword').value });
      if (error) throw error;
    } catch (error) {
      setMessage('authMessage', error.message || '首次开通失败，请稍后再试。', true);
    } finally {
      setBusy(event.currentTarget, false);
    }
  });

  $('passwordForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = $('newPassword').value;
    if (password !== $('newPasswordConfirm').value) return setMessage('passwordMessage', '两次输入的密码不一致。', true);
    setBusy(event.currentTarget, true);
    setMessage('passwordMessage', '正在保存…');
    const { error: passwordError } = await client.auth.updateUser({ password });
    if (passwordError) {
      setMessage('passwordMessage', `密码保存失败：${passwordError.message}`, true);
      setBusy(event.currentTarget, false);
      return;
    }
    const { error: profileError } = await client.from('admin_profiles').update({ must_change_password: false }).eq('id', state.admin.id);
    if (profileError) setMessage('passwordMessage', `权限状态更新失败：${profileError.message}`, true);
    else await handleSession((await client.auth.getSession()).data.session);
    setBusy(event.currentTarget, false);
  });

  $('inviteForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    setBusy(event.currentTarget, true);
    setMessage('inviteMessage', '正在发送邀请…');
    const redirectTo = `${location.origin}${location.pathname}`;
    const { data, error } = await client.functions.invoke('invite-admin', { body: { email: $('inviteEmail').value.trim(), redirectTo } });
    if (error || data?.error) setMessage('inviteMessage', `邀请失败：${data?.error || error.message}`, true);
    else {
      setMessage('inviteMessage', '邀请邮件已发送。');
      event.currentTarget.reset();
    }
    setBusy(event.currentTarget, false);
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
  ['searchInput', 'emotionFilter', 'mbtiFilter'].forEach((id) => $(id).addEventListener(id === 'searchInput' ? 'input' : 'change', applyFilters));
  $('refreshButton').addEventListener('click', loadSubmissions);
  $('exportButton').addEventListener('click', exportCsv);
  $('inviteButton').addEventListener('click', () => { setMessage('inviteMessage'); $('inviteDialog').showModal(); });
  $('logoutButton').addEventListener('click', () => client.auth.signOut());
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
