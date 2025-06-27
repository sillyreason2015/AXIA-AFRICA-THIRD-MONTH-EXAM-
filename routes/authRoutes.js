const router = require('express')
  

const {loginUser, logoutUser}= require('../controllers/authControllers')

const authRouter = router()

authRouter

.post('/login', loginUser)
.post('/logout', logoutUser)



module.exports = authRouter;