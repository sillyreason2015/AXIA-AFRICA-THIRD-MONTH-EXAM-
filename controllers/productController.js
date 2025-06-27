const Product = require('../schema/productSchema')

const createProduct = async (req, res) => {
   const {name, price, color, size} = req.body
   const reqId = req.user._id
   if (!name || !price || !color || !size){
    return res.status(400).json({message: 'All fields are mandatory'})
   }
    try{
        const newProduct = new Product ({...req.body, userId: reqId})
        await newProduct.save()
        res.status(201).json({message: 'New Product created succesfully'})
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}


const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('userId', 'username _id')
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}





const getProduct = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getByQueryParams = async (req, res) => {
    const {name, price, color, size} = req.query 
    const filter = {}
    if (name) filter.name = name
    if (price) filter.price = price
    if (color) filter.color = color
    if (size) filter.size = size


    try{
        const product = await Product.find(filter)
        res.status(200).json(product)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}




const updateProduct = async (req, res) => {
    const {id} = req.params
    const {name, price, color, size}= req.body
    const reqId = req.user._id
    try{
        const product = await Product.findOne({_id: id, userId:reqId})
        if(!product){
            return res.status(400).json({message: "Product not found"})
        }
            product.name = name ?? product.name
            product.price = price ?? product.price
            product.color = color ?? product.color
            product.size = size ?? product.size

        await product.save()
        res.status(200).json({message: "Product updated successfully"})
    }catch(error){
        res.status(500).json(error)
    }
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    try{
        await Product.findByIdAndDelete(id)
        res.status(200).json({message: 'Product deleted from cart successfully'})
    }catch(error){
        res.status(500).json(error)
    }
}

module.exports = {
    createProduct,
    getProduct,
    getAllProducts,
    getByQueryParams,
    updateProduct,
    deleteProduct,
}