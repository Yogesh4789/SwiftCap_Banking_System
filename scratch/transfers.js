const http = require('http');

const transfers = [
  { fromAccount: 1001, toAccount: 1002, amount: 500 },
  { fromAccount: 1003, toAccount: 1001, amount: 2000 },
  { fromAccount: 1002, toAccount: 1005, amount: 300 },
  { fromAccount: 1005, toAccount: 1004, amount: 150 }
];

async function runTransfers() {
  for (const tx of transfers) {
    const data = JSON.stringify(tx);
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/bank/transfer',
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
      req.write(data);
      req.end();
    });
    console.log(`Transferred ${tx.amount} from ${tx.fromAccount} to ${tx.toAccount}`);
  }
}

runTransfers();
