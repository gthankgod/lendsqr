
const httpStatus = require('http-status');
const service = require('../services/auth');
const responseHandler = require('../utils/responseHandler');

const register = async (req, res, next) => {
    try {
      const user = await service.register({...req.body});
      return responseHandler(res, user, 'User was succesfully registered', { code: 200 })
    } catch (error) {
      console.log(error)
      return responseHandler(res, null, error.message, { code: 400 });
    }
  };

  const login = async (req, res, next) => {
    try {
      const user = await service.login({ ...req.body });
      return responseHandler(res, user, 'Successful login attempt', { code: 200 })
    } catch (error) {
      return next(error);
    }
  };

  module.exports = {
    register,
    login
  }
