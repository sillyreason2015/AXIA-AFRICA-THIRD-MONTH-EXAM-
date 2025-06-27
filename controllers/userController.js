const User = require('../schema/userSchema')
const bcryptjs = require('bcryptjs')
const registerUser = async (req, res) => {
   const {username, email, password} = req.body
   if (!username || !email || !password){
    res.status(400).json({message: 'All fields are mandatory'})
   }
    try{
        const user = await User.findOne({email})
        if (user) {
            res.status(400).json({message: 'User already exists'})
        }
        const salt = bcryptjs.genSaltSync(10)
        const hashedPassword = bcryptjs.hashSync(password, salt)
        const newUser = new User ({...req.body, password:hashedPassword})
        await newUser.save()
        res.status(201).json({message: 'New user created succesfully'})
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


const getAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}




const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getByQueryParams = async (req, res) => {
    const {username, email} = req.query 
    const filter = {}
    if (username) filter.username = username
    if (email) filter.email = email

    try{
        const user = await User.find(filter)
        res.status(200).json(user)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}




const updateUser = async (req, res) => {
    const {id} = req.params
    const reqId = req.user._id
    const {username, email, password}= req.body
    if(id === reqId){
    try{
        const user = await User.findByIdAndUpdate(id, req.body)
        res.status(200).json({message: "User updated successfully"})
    }catch(error){
        res.status(500).json(error)
    }
    }else{
        return res.status(401).json({message: "You are not authorized to edit this user"})
    }
}




const deleteUser = async (req, res) => {
    const {id} = req.params
    const {_id, admin} = req.user
    if(_id=== _id || admin === true){
    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({message: 'user deleted successfully'})
    }catch(error){
        res.status(500).json(error)
    }
}else{
    return res.status(401).json({message: "You are not authorized to delete this user"})
}
}

module.exports = {
    registerUser,
    getUser,
    getAllUsers,
    getByQueryParams,
    updateUser,
    deleteUser,
}