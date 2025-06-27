const Cart = require('../schema/cartSchema')

const addCart = async (req, res) => {
    const { quantity } = req.body;
    const reqPid = req.product._id;
    const reqUid = req.user._id;

    try {
        let cart = await Cart.findOne({ userId: reqUid });

        if (!cart) {
            cart = new Cart({
                userId: reqUid,
                products: [{ productId: reqPid, quantity }]
            });
        } else {
            const existingItem = cart.products.find(item => item.productId.toString() === reqPid.toString());
            if (existingItem) {
                return res.status(400).json({ message: "Product already in cart" });
            }
            cart.products.push({ productId: reqPid, quantity });
        }

        await cart.save();
        res.status(201).json({ message: "Product added to cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {addCart}