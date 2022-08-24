const auth = require('../services/auth');
const { expect } = require('chai');
const db = require('../db');


describe('POST /auth/register', () => {
    let data = { email: 'gthankgod@gmail.com', password: '123456' };

    it('should register a new customer when request is ok', () => {
      return auth(data)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.token).to.have.a.property('token');
          expect(res.body.token).to.have.a.property('email');
          expect(res.body.token).to.have.a.property('name');
          expect(res.body.token).to.have.a.property('balance');
        });
    });

    it('should report error when email already exists', () => {
      data.email = 'test@test.com';
      return auth(data)
        .expect(httpStatus.CONFLICT)
        .then((res) => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('email');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"email" already exists');
        });
    });

    it('should report error when the email provided is not valid', () => {
      data.email = 'this_is_not_an_email';
      return auth(data)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('email');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"email" must be a valid email');
        });
    });

    it('should report error when email and password are not provided', () => {
      return auth({})
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('email');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"email" is required');
        });
    });
  });

  describe('POST /auth/login', () => {
    let data = { email: 'gthankgod@gmail.com', password: '123456' };

    it('should log user in when request is ok and user exist', () => {
      return auth(data)
        .expect(httpStatus.CREATED)
        .then((res) => {
          expect(res.body.token).to.have.a.property('token');
          expect(res.body.token).to.have.a.property('email');
          expect(res.body.token).to.have.a.property('name');
          expect(res.body.token).to.have.a.property('balance');
        });
    });

    it('should report error when email does not exist', () => {
      data.email = 'test@test.com';
      return auth(data)
        .expect(httpStatus.CONFLICT)
        .then((res) => {
          const { field } = res.body.errors[0];
          const { location } = res.body.errors[0];
          const { messages } = res.body.errors[0];
          expect(field).to.be.equal('email');
          expect(location).to.be.equal('body');
          expect(messages).to.include('"email" already exists');
        });
    });

  });


