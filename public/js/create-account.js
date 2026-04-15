const form = document.getElementById('createAccountForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const accountNumber = Number(document.getElementById('accountNumber').value);
  const initialBalance = Number(document.getElementById('initialBalance').value);

  try {
    await request('/create-account', {
      method: 'POST',
      body: JSON.stringify({ accountNumber, initialBalance }),
    });

    form.reset();
    showToast(`Account ${accountNumber} created`);
  } catch (error) {
    showToast(error.message, 'error');
  }
});
