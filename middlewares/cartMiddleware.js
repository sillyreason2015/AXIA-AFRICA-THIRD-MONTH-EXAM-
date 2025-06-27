// middleware for verifying productId attached to specific user
const Product = require("../schema/productSchema");

const loadProduct = async (req, res, next) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: "Product ID is required" });
    }

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        req.product = product; // Attach product to request
        next();
    } catch (err) {
        return res.status(500).json({ message: "Error loading product" });
    }
};

module.exports = loadProduct;
