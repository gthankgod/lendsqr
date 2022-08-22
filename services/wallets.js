let { v4: uuidv4 } = require('uuid');
let moment = require('moment');
let { collectionCall } = require('./GatewayCalls');
let db = require('../db')


const balance = (user) => user.balance;

const funding = async (user, amount, card) => {
    let gateWayCall = await collectionCall(amount, card);
    if(gateWayCall.status === 'failed') {
        throw new Error('Funding attempt unsuccessful');
    }
    let newWallet = {
        userId: user.id,
        ref: `funding-${user.id}-${uuidv4()}`,
        type: 'C',
        message: 'wallet_funding',
        amount,
        prevBalance: user.balance,
        created: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'), 
        balance: user.balance + amount
    }
    
    user.balance += amount;

    Promise.all([
        await db("users").update({balance: user.balance}).where({id: user.id}),
        await db("wallethistory").insert(newWallet)
    ])

    return user
}

const transfer = async ({user, amount, recipientAccountNumber}) => {
    if(user.balance > amount) throw new Error('Insufficient balance')
    let recipient = await db('users').where({id: recipientAccountNumber});
    if(!recipient) throw new error('No user with the attached Account number/ User Id');

    let ref = uuidv4();

    // Wallets Operation
    let userWalletHistory = {
        userId: user.id,
        ref,
        type: 'D',
        message: 'transfer',
        amount,
        prevBalance: user.balance,
        created: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'), 
    }
    
    user.balance -= amount;
    userWalletHistory.balance = user.balance

    let recipientWalletHistory = {
        userId: recipient[0].id,
        ref,
        type: 'C',
        message: 'collection',
        amount,
        prevBalance: recipient[0].balance,
        created: moment(new Date()).format('YYYY-MM-DD hh:mm:ss'), 
    }

    recipient[0].balance += amount;
    recipientWalletHistory.balance = recipient[0].balance;

    // make calls once to improve response return cycle rate
    Promise.all([
        await db("users").update({balance: user.balance}).where({id: user.id}),
        await db("wallethistory").insert(userWalletHistory),
        await db("users").update({balance: recipient[0].balance}).where({id: recipient[0].id}),
        await db("wallethistory").insert(recipientWalletHistory)
    ])

    return user
}

const withdraw = async (user, amount) => {
    if(user.balance < amount) throw new Error('Insufficient balance');

    // Wallets Operation
    let userWalletHistory = {
        userId: user.id,
        ref: `WTD-${uuidv4()}`,
        type: 'D',
        message: 'withdraw',
        amount,
        prevBalance: user.balance,
        created:moment(new Date()).format('YYYY-MM-DD hh:mm:ss'), 
        balance: user.balance - amount
    }
    
    user.balance -= amount;
    userWalletHistory.balance = user.balance

    // Insert into wallet DB
    Promise.all([
        await db("users").update({balance: user.balance}).where({id: user.id}),
        await db("wallethistory").insert(userWalletHistory)
    ])

    return user
}

module.exports = {
    balance,
    funding,
    transfer,
    withdraw
}
