const Bank = require('../models/Bank');

class BankingService {
  constructor() {
    this.bank = new Bank({ minimumBalance: 100 });
  }

  createAccount(accountNumber, initialBalance) {
    return this.bank.createAccount(accountNumber, initialBalance);
  }

  getBalance(accountNumber) {
    return this.bank.getBalance(accountNumber);
  }

  transfer(fromAccount, toAccount, amount) {
    return this.bank.transfer(fromAccount, toAccount, amount);
  }

  getAccount(accountNumber) {
    return this.bank.getAccount(accountNumber);
  }

  listAccounts() {
    return this.bank.getAccountsSortedByNumber();
  }
}

module.exports = new BankingService();
