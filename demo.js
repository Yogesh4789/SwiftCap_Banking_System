const Bank = require('./models/Bank');

function runDemo() {
  const bank = new Bank({ minimumBalance: 100 });

  console.log('Creating accounts...');
  bank.createAccount(1001, 1000);
  bank.createAccount(1002, 700);
  bank.createAccount(1003, 1200);

  console.log('\nBalances before transfer:');
  console.log(bank.getBalance(1001));
  console.log(bank.getBalance(1002));

  console.log('\nTransferring 300 from 1001 to 1002...');
  console.log(bank.transfer(1001, 1002, 300));

  console.log('\nBalances after transfer:');
  console.log(bank.getBalance(1001));
  console.log(bank.getBalance(1002));

  console.log('\nAccounts sorted by account number (BST in-order):');
  console.log(bank.getAccountsSortedByNumber());
}

runDemo();
