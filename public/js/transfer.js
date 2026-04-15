const transferForm = document.getElementById('transferForm');
const receipt = document.getElementById('transferReceipt');

transferForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fromAccount = Number(document.getElementById('fromAccount').value);
  const toAccount = Number(document.getElementById('toAccount').value);
  const amount = Number(document.getElementById('amount').value);

  try {
    const payload = await request('/transfer', {
      method: 'POST',
      body: JSON.stringify({ fromAccount, toAccount, amount }),
    });

    const transfer = payload.transfer;
    receipt.textContent = [
      `Transfer Status: Success`,
      `From Account: ${transfer.fromAccount}`,
      `To Account: ${transfer.toAccount}`,
      `Amount: ${formatCurrency(transfer.amount)}`,
      `Sender Balance: ${formatCurrency(transfer.fromBalance)}`,
      `Receiver Balance: ${formatCurrency(transfer.toBalance)}`,
      `Timestamp: ${formatDate(transfer.transferredAt)}`,
    ].join('\n');

    transferForm.reset();
    showToast('Transfer completed');
  } catch (error) {
    receipt.textContent = 'Transfer failed.';
    showToast(error.message, 'error');
  }
});
