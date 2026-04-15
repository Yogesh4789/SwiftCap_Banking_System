const http = require('http');

const accounts = [
  { accountNumber: 1001, initialBalance: 5000 },
  { accountNumber: 1002, initialBalance: 2500 },
  { accountNumber: 1003, initialBalance: 12000 },
  { accountNumber: 1004, initialBalance: 750 },
  { accountNumber: 1005, initialBalance: 3300 }
];

async function seed() {
  for (const acc of accounts) {
    const data = JSON.stringify(acc);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/bank/create-account',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    };

    await new Promise((resolve) => {
      const req = http.request(options, (res) => {
        res.on('data', () => {});
        res.on('end', resolve);
      });
      req.on('error', (e) => {
        console.error(e);
        resolve();
      });
      req.write(data);
      req.end();
    });
    console.log(`Created account ${acc.accountNumber}`);
  }
}

seed();
