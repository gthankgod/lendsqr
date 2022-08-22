const wallets = require('../services/wallets');
const { expect } = require('chai');
const db = require('../config/db');


describe('POST /wallets/balance', async () => {
    let user = await db("users").where('email', "test@test.com");
    it('should return latest wallet balance of user', () => {
      return wallets.balance({ id: user[0].id, email: user[0].email, balance: user[0].balance})
        .expect(httpStatus.CREATED)
        .then((res) => {
          console.log(res)
        //   expect(res).to.have.a.property('token');
        //   expect(res).to.have.a.property('email');
        //   expect(res).to.have.a.property('name');
        //   expect(res).to.have.a.property('balance');
        });
    });
  });

// describe('POST /wallets/fund', () => {
// let data = { user: req.user, amount: 100, card: '12121212121212121' }

// it('should log user in when request is ok and user exist', () => {
//     return auth(data)
//     .expect(httpStatus.CREATED)
//     .then((res) => {
//         expect(res).to.have.a.property('token');
//         expect(res).to.have.a.property('email');
//         expect(res).to.have.a.property('name');
//         expect(res).to.have.a.property('balance');
//     });
// });

// it('should report error when email does not exist', () => {
//     data.email = 'test@test.com';
//     return auth(data)
//     .expect(httpStatus.CONFLICT)
//     .then((res) => {
//         const { field } = res.body.errors[0];
//         const { location } = res.body.errors[0];
//         const { messages } = res.body.errors[0];
//         expect(field).to.be.equal('email');
//         expect(location).to.be.equal('body');
//         expect(messages).to.include('"email" already exists');
//     });
// });

// });

// describe('POST /wallets/withdraw', () => {
// let data = {user, amount};

// it('should log user in when request is ok and user exist', () => {
//     return auth(data)
//     .expect(httpStatus.CREATED)
//     .then((res) => {
//         expect(res).to.have.a.property('token');
//         expect(res).to.have.a.property('email');
//         expect(res).to.have.a.property('name');
//         expect(res).to.have.a.property('balance');
//     });
// });

// it('should report error when email does not exist', () => {
//     data.email = 'test@test.com';
//     return auth(data)
//     .expect(httpStatus.CONFLICT)
//     .then((res) => {
//         const { field } = res.body.errors[0];
//         const { location } = res.body.errors[0];
//         const { messages } = res.body.errors[0];
//         expect(field).to.be.equal('email');
//         expect(location).to.be.equal('body');
//         expect(messages).to.include('"email" already exists');
//     });
// });

// });

// describe('POST /wallets/transfer', () => {
// let data = {user, amount, recipientAccountNumber};

// it('should log user in when request is ok and user exist', () => {
//     return auth(data)
//     .expect(httpStatus.CREATED)
//     .then((res) => {
//         expect(res).to.have.a.property('token');
//         expect(res).to.have.a.property('email');
//         expect(res).to.have.a.property('name');
//         expect(res).to.have.a.property('balance');
//     });
// });

// it('should report error when email does not exist', () => {
//     data.email = 'test@test.com';
//     return auth(data)
//     .expect(httpStatus.CONFLICT)
//     .then((res) => {
//         const { field } = res.body.errors[0];
//         const { location } = res.body.errors[0];
//         const { messages } = res.body.errors[0];
//         expect(field).to.be.equal('email');
//         expect(location).to.be.equal('body');
//         expect(messages).to.include('"email" already exists');
//     });
// });

// });


