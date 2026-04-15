const express = require('express');
const path = require('path');
const bankRoutes = require('./routes/bankRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/app', express.static(path.join(__dirname, 'public')));

app.get('/app', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/app/create-account', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create-account.html'));
});
app.get('/app/create-account/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'create-account.html'));
});
app.get('/app/balance', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'balance.html'));
});
app.get('/app/balance/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'balance.html'));
});
app.get('/app/transfer', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'transfer.html'));
});
app.get('/app/transfer/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'transfer.html'));
});
app.get('/app/accounts', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'accounts.html'));
});
app.get('/app/accounts/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'accounts.html'));
});

app.get('/', (_req, res) => {
  res.status(200).json({
    name: 'SwiftCap Banking API',
    status: 'running',
    endpoints: {
      ui: 'GET /app',
      uiCreateAccount: 'GET /app/create-account',
      uiBalance: 'GET /app/balance',
      uiTransfer: 'GET /app/transfer',
      uiAccounts: 'GET /app/accounts',
      health: 'GET /health',
      createAccount: 'POST /api/bank/create-account',
      getBalance: 'GET /api/bank/balance/:id',
      transfer: 'POST /api/bank/transfer',
      getAccount: 'GET /api/bank/accounts/:id',
      listAccounts: 'GET /api/bank/accounts',
    },
  });
});

app.use('/api/bank', bankRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((error, _req, res, _next) => {
  const message = error.message || 'Internal server error';

  let statusCode = 400;
  if (message.includes('not found')) {
    statusCode = 404;
  }

  res.status(statusCode).json({ error: message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Banking server running on port ${PORT}`);
  });
}

module.exports = app;
