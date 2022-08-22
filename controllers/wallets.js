const httpStatus = require('http-status');
const walletService = require('../services/wallets');
const responseHandler = require('../utils/responseHandler');


const getBalance = async (req, res) => {
  let user = req.user;
  let balance = await walletService.balance(user);
  return responseHandler(res, balance, "Succesfully retrieved balance", { code: 200 })
}

const fund = async (req, res, next) => {
  try {
    let user = req.user;
    let amount = req.body.amount;
    let cardNumber = req.body.cardNumber;
    let fundUser = await walletService.funding(user, amount, cardNumber);
    return responseHandler(res, fundUser, "Succesfully funded account", { code: 200 })
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * eWallet Transfer
 * @public
 */
const transfer = async (req, res, next) => {
  try { 
    let user = req.user; 
    let { amount, recipientAccountNumber } = req.body;

    const transferResponse = await walletService.transfer({ user,amount, recipientAccountNumber});      
    return responseHandler(res, transferResponse, "Transfer was successful", { code: 200 }) 
  } catch (error) {
    next(error);
  }
};

/**
 * eWallet Withdrawal
 * @public
 */
const withdraw = async (req, res, next) => {
  try {
    let user = req.user;
    let { amount } = req.body;
    const withdrawalResponse = await walletService.withdraw(user, amount);        
      
    return responseHandler(res, withdrawalResponse, "Transfer was successful", { code: 200 }) 
  } catch (error) {
    console.log(error)
    next(error);
  }
};


module.exports = {
    getBalance,
    fund, 
    transfer,
    withdraw
}
