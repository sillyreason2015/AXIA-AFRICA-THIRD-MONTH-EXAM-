const express = require('express')
const connectDb = require('./database/db')
const userRouter = require('./routes/userRoutes')
const authRouter = require('./routes/authRoutes')
const cartRouter = require('./routes/cartRoutes')
const productRouter = require('./routes/productRoutes')
const cookieParser = require('cookie-parser')




const app = express()
require('dotenv').config()
const port = process.env.PORT


connectDb()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())


app.use('/api', userRouter)
app.use('/api', authRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

app.listen(port, ()=>{
    console.log(`Server has started on ${port}`)
})