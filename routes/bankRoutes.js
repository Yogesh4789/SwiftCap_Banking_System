const express = require('express');
const bankingService = require('../services/bankingService');

const router = express.Router();

router.post('/create-account', (req, res, next) => {
  try {
    const { accountNumber, initialBalance } = req.body;
    const account = bankingService.createAccount(accountNumber, initialBalance);
    res.status(201).json({
      message: 'Account created successfully',
      account,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/balance/:id', (req, res, next) => {
  try {
    const balance = bankingService.getBalance(req.params.id);
    res.status(200).json(balance);
  } catch (error) {
    next(error);
  }
});

router.post('/transfer', (req, res, next) => {
  try {
    const { fromAccount, toAccount, amount } = req.body;
    const result = bankingService.transfer(fromAccount, toAccount, amount);
    res.status(200).json({
      message: 'Transfer completed successfully',
      transfer: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get('/accounts/:id', (req, res, next) => {
  try {
    const account = bankingService.getAccount(req.params.id);
    res.status(200).json(account);
  } catch (error) {
    next(error);
  }
});

router.get('/accounts', (req, res, next) => {
  try {
    const accounts = bankingService.listAccounts();
    res.status(200).json({ count: accounts.length, accounts });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
