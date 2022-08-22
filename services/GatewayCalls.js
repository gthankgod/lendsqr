let moment = require('moment');
let uuid = require('uuid')

let payoutCall = () => {

}

let collectionCall = (amount, card) => {
    let cardObj;
    let ref = uuid.v4();

    let cardDictionary = {
        '1212121212121212': { status: 'success', value: 'Success' },
        '1234567890123456': { status: 'failed', value: 'Invalid PIN'},
        '0101010101010101': { status: 'failed', value: 'Invalid OTP'}
    }

    if(!cardDictionary[card]) cardObj = { status: 'failed', value: 'Transaction failed' }
    cardObj = cardDictionary[card]
console.log(cardObj)
    return {
        status : cardObj.status,
        message: cardObj.value,
        amount,
        ref,
        paymentDate: moment(moment(new Date()).format('YYYY-MM-DD hh:mm:ss')),
    }
}

module.exports = {
    collectionCall
}
