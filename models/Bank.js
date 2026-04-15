const LinkedList = require('./LinkedList');
const BST = require('./BST');
const {
  parseAccountNumber,
  parseAmount,
  validateMinimumBalance,
} = require('../utils/validators');

class Bank {
  constructor({ minimumBalance = 100 } = {}) {
    this.minimumBalance = minimumBalance;
    this.accountsList = new LinkedList();
    this.accountsTree = new BST();
  }

  createAccount(accountNumber, initialBalance) {
    const parsedAccountNumber = parseAccountNumber(accountNumber);
    const parsedInitialBalance = parseAmount(initialBalance, 'Initial balance');
    validateMinimumBalance(parsedInitialBalance, this.minimumBalance);

    if (this.accountsTree.find(parsedAccountNumber)) {
      throw new Error(`Account ${parsedAccountNumber} already exists`);
    }

    const account = {
      accountNumber: parsedAccountNumber,
      balance: parsedInitialBalance,
      transactionHistory: new LinkedList(),
      createdAt: new Date().toISOString(),
    };

    account.transactionHistory.append({
      type: 'ACCOUNT_CREATED',
      amount: parsedInitialBalance,
      at: new Date().toISOString(),
      description: 'Initial deposit',
    });

    this.accountsList.append(account);
    this.accountsTree.insert(parsedAccountNumber, account);

    return this._serializeAccount(account);
  }

  getBalance(accountNumber) {
    const parsedAccountNumber = parseAccountNumber(accountNumber);
    const account = this.accountsTree.find(parsedAccountNumber);

    if (!account) {
      throw new Error(`Account ${parsedAccountNumber} not found`);
    }

    return {
      accountNumber: account.accountNumber,
      balance: account.balance,
    };
  }

  transfer(fromAccount, toAccount, amount) {
    const parsedFrom = parseAccountNumber(fromAccount);
    const parsedTo = parseAccountNumber(toAccount);
    const parsedAmount = parseAmount(amount, 'Transfer amount');

    if (parsedFrom === parsedTo) {
      throw new Error('Sender and receiver accounts must be different');
    }

    const sender = this.accountsTree.find(parsedFrom);
    const receiver = this.accountsTree.find(parsedTo);

    if (!sender) {
      throw new Error(`Account ${parsedFrom} not found`);
    }

    if (!receiver) {
      throw new Error(`Account ${parsedTo} not found`);
    }

    if (sender.balance < parsedAmount) {
      throw new Error('Insufficient balance');
    }

    // Atomic balance update in memory:
    // perform all validations before mutating either account.
    sender.balance -= parsedAmount;
    receiver.balance += parsedAmount;

    const timestamp = new Date().toISOString();

    sender.transactionHistory.append({
      type: 'DEBIT',
      amount: parsedAmount,
      at: timestamp,
      from: parsedFrom,
      to: parsedTo,
      description: `Transferred to account ${parsedTo}`,
    });

    receiver.transactionHistory.append({
      type: 'CREDIT',
      amount: parsedAmount,
      at: timestamp,
      from: parsedFrom,
      to: parsedTo,
      description: `Received from account ${parsedFrom}`,
    });

    return {
      fromAccount: sender.accountNumber,
      toAccount: receiver.accountNumber,
      amount: parsedAmount,
      fromBalance: sender.balance,
      toBalance: receiver.balance,
      transferredAt: timestamp,
    };
  }

  getAccount(accountNumber) {
    const parsedAccountNumber = parseAccountNumber(accountNumber);
    const account = this.accountsTree.find(parsedAccountNumber);

    if (!account) {
      throw new Error(`Account ${parsedAccountNumber} not found`);
    }

    return this._serializeAccount(account);
  }

  getAllAccounts() {
    const accounts = [];
    this.accountsList.forEach((account) => {
      accounts.push(this._serializeAccount(account));
    });
    return accounts;
  }

  getAccountsSortedByNumber() {
    const accounts = [];
    this.accountsTree.inOrderTraversal((_, account) => {
      accounts.push(this._serializeAccount(account));
    });
    return accounts;
  }

  _serializeAccount(account) {
    return {
      accountNumber: account.accountNumber,
      balance: account.balance,
      createdAt: account.createdAt,
      transactions: account.transactionHistory.toArray(),
    };
  }
}

module.exports = Bank;
