const Cart = require('../schema/cartSchema')

const addCart = async (req, res) => {
    const {quantity} = req.body
    const reqPid = req.product._id
    const reqUid = req.user._id
    try{
        const cart = await Cart.findOne({userId: reqUid})
        if(cart){
            return res.status(400).json({message: "Already added to cart"})
        }

        const newCartItem = new Cart ({...req.body, userId: reqUid, productId: reqPid})
        await newCartItem.save()
        res.status(201).json({message: "Product added to cart successfully"})

    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


module.exports = {addCart}