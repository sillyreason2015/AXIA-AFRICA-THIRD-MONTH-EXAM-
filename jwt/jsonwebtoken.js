const jwt = require('jsonwebtoken')
require('dotenv').config

const jsonwebtoken = (userId)=>{
    return jwt.sign({userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1h"})
}

module.exports =  jsonwebtoken