const jwt = require('jsonwebtoken')
const userModel = require('../schema/userSchema')

const authMiddleware = async (req, res,next)=>{
    const accessToken = req.cookies.token
    const jwtSecret = process.env.ACCESS_TOKEN_SECRET

    if (!accessToken){
       return res.status(401).json({message: "Please Login First"})
    }try{
        const tokenSecret = jwt.verify(accessToken, jwtSecret)
        
        if(!tokenSecret){
            return res.status(401).json({message: "Invalid Token"}).select('-password')
        }
        const verifiedUser = await userModel.findById(tokenSecret.userId)
        if (!verifiedUser){
            return res.status(401).json({message: "Invalid ID"})
        }
        req.user = verifiedUser
        next()

    }catch(error){
        return res.status(500).json({message: "Please Login First"})
    }

}


module.exports = authMiddleware