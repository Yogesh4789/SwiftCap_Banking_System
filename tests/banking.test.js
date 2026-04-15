const test = require('node:test');
const assert = require('node:assert/strict');
const Bank = require('../models/Bank');

test('create multiple accounts and fetch balances', () => {
  const bank = new Bank({ minimumBalance: 100 });

  bank.createAccount(1001, 500);
  bank.createAccount(1002, 1000);

  const a1 = bank.getBalance(1001);
  const a2 = bank.getBalance(1002);

  assert.equal(a1.balance, 500);
  assert.equal(a2.balance, 1000);
});

test('transfer funds between valid accounts', () => {
  const bank = new Bank({ minimumBalance: 100 });

  bank.createAccount(2001, 1500);
  bank.createAccount(2002, 500);

  const transfer = bank.transfer(2001, 2002, 400);

  assert.equal(transfer.fromBalance, 1100);
  assert.equal(transfer.toBalance, 900);
  assert.equal(bank.getBalance(2001).balance, 1100);
  assert.equal(bank.getBalance(2002).balance, 900);
});

test('prevent duplicate account creation', () => {
  const bank = new Bank({ minimumBalance: 100 });
  bank.createAccount(3001, 500);

  assert.throws(() => bank.createAccount(3001, 600), {
    message: 'Account 3001 already exists',
  });
});

test('reject transfer on insufficient balance', () => {
  const bank = new Bank({ minimumBalance: 100 });

  bank.createAccount(4001, 200);
  bank.createAccount(4002, 300);

  assert.throws(() => bank.transfer(4001, 4002, 500), {
    message: 'Insufficient balance',
  });

  assert.equal(bank.getBalance(4001).balance, 200);
  assert.equal(bank.getBalance(4002).balance, 300);
});

test('reject invalid accounts and amounts', () => {
  const bank = new Bank({ minimumBalance: 100 });
  bank.createAccount(5001, 600);

  assert.throws(() => bank.getBalance(9999), {
    message: 'Account 9999 not found',
  });

  assert.throws(() => bank.transfer(5001, 5001, 100), {
    message: 'Sender and receiver accounts must be different',
  });

  assert.throws(() => bank.transfer(5001, 5002, -50), {
    message: 'Transfer amount must be a positive number',
  });
});
