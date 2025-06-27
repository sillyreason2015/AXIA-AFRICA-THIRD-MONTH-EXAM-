const router = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
  

const {
    registerUser,
    getUser,
    getAllUsers,
    getByQueryParams,
    updateUser,
    deleteUser,
}= require('../controllers/userController')

const Router = router()

Router
.get('/user/:id',authMiddleware,getUser)
.get('/users/',authMiddleware,getAllUsers)
.get('/user', getByQueryParams)
.post('/user/create', registerUser)
.put('/edit/:id',authMiddleware,updateUser)
.delete('/user/delete/:id',authMiddleware,deleteUser)


module.exports = Router;