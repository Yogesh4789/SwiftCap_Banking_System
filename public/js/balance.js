const balanceForm = document.getElementById('balanceForm');
const result = document.getElementById('balanceResult');

balanceForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const accountNumber = Number(document.getElementById('balanceAccountNumber').value);

  try {
    const payload = await request(`/balance/${accountNumber}`);
    result.textContent = [
      `Lookup Status: Success`,
      `Account Number: ${payload.accountNumber}`,
      `Current Balance: ${formatCurrency(payload.balance)}`,
      `Checked At: ${formatDate(new Date().toISOString())}`,
    ].join('\n');
    showToast('Balance fetched');
  } catch (error) {
    result.textContent = 'Balance lookup failed.';
    showToast(error.message, 'error');
  }
});
