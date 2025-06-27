const router = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const loadProduct = require('../middlewares/cartMiddleware');



const {addCart} = require('../controllers/cartController')

const Router = router()

Router
.post('/add/:id', authMiddleware,loadProduct,addCart)

module.exports = Router