const refreshBtn = document.getElementById('refreshBtn');
const lookupForm = document.getElementById('accountLookupForm');
const lookupResult = document.getElementById('accountLookupResult');

async function loadAllAccounts() {
  const payload = await request('/accounts');
  const accounts = payload.accounts || [];
  document.getElementById('accountCount').textContent = `${accounts.length} accounts`;
  renderAccountsRows('accountsBody', accounts, 'No accounts found.');
}

refreshBtn.addEventListener('click', async () => {
  try {
    await loadAllAccounts();
    showToast('Accounts refreshed');
  } catch (error) {
    showToast(error.message, 'error');
  }
});

lookupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const accountNumber = Number(document.getElementById('lookupAccountNumber').value);

  try {
    const account = await request(`/accounts/${accountNumber}`);
    lookupResult.textContent = JSON.stringify(account, null, 2);
    showToast('Account fetched');
  } catch (error) {
    lookupResult.textContent = 'Account lookup failed.';
    showToast(error.message, 'error');
  }
});

(async function bootstrap() {
  try {
    await loadAllAccounts();
  } catch (error) {
    showToast(error.message, 'error');
  }
})();
