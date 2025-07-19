const jwt = require('jsonwebtoken');

const verifyToken = (token) =>{
    return jwt.verify(token, process.env.JWT_SECRET);
};

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:300});
};

module.exports = {verifyToken, generateToken};