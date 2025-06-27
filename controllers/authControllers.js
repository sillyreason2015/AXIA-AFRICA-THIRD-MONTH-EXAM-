const User = require('../schema/userSchema')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Login function
const loginUser = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Please provide all fields" })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found! Please register to continue" })
        }

        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Login Credentials" })
        }

        const jsonToken = (userId) => {
            return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5h" })
        }

        const token = jsonToken(user._id)

        return res
            .cookie('token', token, { httpOnly: true, sameSite: 'strict' })
            .status(200)
            .json({ message: "Login Successful" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// ✅ Logout function
const logoutUser = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'strict' })
    res.status(200).json({ message: "Logout successful" })
}

module.exports = {
    loginUser,
    logoutUser
}
