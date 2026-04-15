function parseAccountNumber(accountNumber) {
  const value = Number(accountNumber);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error('Account number must be a positive integer');
  }
  return value;
}

function parseAmount(amount, fieldName = 'Amount') {
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${fieldName} must be a positive number`);
  }
  return value;
}

function validateMinimumBalance(amount, minimumBalance) {
  if (amount < minimumBalance) {
    throw new Error(`Initial balance must be at least ${minimumBalance}`);
  }
}

module.exports = {
  parseAccountNumber,
  parseAmount,
  validateMinimumBalance,
};
