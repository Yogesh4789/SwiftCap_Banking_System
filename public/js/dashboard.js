async function initDashboard() {
  try {
    const payload = await request('/accounts');
    const accounts = payload.accounts || [];

    const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance), 0);
    const average = accounts.length ? totalBalance / accounts.length : 0;

    document.getElementById('kpiAccounts').textContent = String(accounts.length);
    document.getElementById('kpiTotal').textContent = formatCurrency(totalBalance);
    document.getElementById('kpiAverage').textContent = formatCurrency(average);

    renderAccountsRows('recentAccountsBody', accounts.slice(-5).reverse(), 'No accounts yet.');
  } catch (error) {
    showToast(error.message, 'error');
  }
}

initDashboard();
