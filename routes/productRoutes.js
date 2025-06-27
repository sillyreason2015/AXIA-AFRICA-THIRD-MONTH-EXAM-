const router = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
  

const {createProduct}= require('../controllers/productController')


const Router = router()


Router

.post('/create',authMiddleware,createProduct)



module.exports = Router;