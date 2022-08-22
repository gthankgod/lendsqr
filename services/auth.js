const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/index');

const register = async ({ email: userEmail, password, name }) => {
    try {
        if(!userEmail || !password ) throw new Error('Incomplete details passed. Please check this and try again')
        
        let user = { email: userEmail };
        let checkIfUserExist = await db("users").where('email', userEmail);

        if(!Array.isArray(checkIfUserExist) || checkIfUserExist.length > 1) throw new Error("User already exists. Please login instead")
         // Hash password
         const saltRounds = config.getPasswordRounds;
         let hash = await bcrypt.hash(password, saltRounds)
         user.password = hash;

         user = await db("users").insert(user);
         let {id, email, name, balance } = {...user[0]}
         const token = jwt.sign({id}, config.jwtSecret, { expiresIn: config.jwtDuration });
        
        return { email, name, token, balance }
    } catch (error) {
        throw new Error(error.message)
    }    
}

const login = async ({ email: userEmail, password }) => {
    try {
        if(!userEmail || !password) throw new Error('Email/Password field is missing');

        let user = await db("users").where('email', userEmail);
        if(!Array.isArray(user) || user.length < 1) throw new Error('Invalid email/password. Please check credentials and try again')
        
        const match = await bcrypt.compare(password, user[0].password);
        if(!match) throw new Error('Invalid email/password. Please check credentials and try again')
        
        let {id, email, name, balance} = {...user[0]}
        const token = jwt.sign({id}, config.jwtSecret, { expiresIn: config.jwtDuration });

        return { email, name, token, balance }
    } catch (error) {
        throw new Error(error.message)
    }    
}

module.exports = {
    register,
    login
};
