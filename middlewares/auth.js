const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config/index');
const db = require('../db')

const authorize = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  try {
    if(!token) return res.status(401).json({ status: 'error', message: 'No token provided.' });

    jwt.verify(token, config.jwtSecret, async (err, decoded) => {
      if(err) return res.json({ status: 'error', message: 'Token Authentication Failure'})
    
      let dbUser = await db('users').where({id: decoded.id});
      req.user = { id: dbUser[0].id, email: dbUser[0].email, balance: dbUser[0].balance}
    
      return next();
    })

    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message})
    }

};

module.exports = authorize;
