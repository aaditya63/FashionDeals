const { imageUploadUtil } = require("../../config/cloudinary");
const Product = require("../../models/Product");


const handleImageUpload = async (req, res) => {
    try {
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const url = "data:" + req.file.mimetype + ";base64," + b64;
        const result = await imageUploadUtil(url);
        res.json({
            success: true,
            result
        })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some Error Occured"
        })
    }
}



//add new product
const addProduct = async(req,res)=>{
    try{
        const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;
        const product = new Product({
            image,title,description,category,brand,price,salePrice,totalStock
        })
        
        await product.save()
        res.status(201).json({
            success:true,
            message:"New Product Added Successfully",
            data : product
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error Occured"
        })
    }
}


//fetch all products
const fetchAllProducts = async(req,res)=>{
    try{
        const listOfProduct = await Product.find({})
        res.status(200).json({
            success:true,
            message:"Data fetched",
            data : listOfProduct
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error Occured"
        })
    }
}


//edit a product
const editProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const {image,title,description,category,brand,price,salePrice,totalStock} = req.body;
        let findProduct = await Product.findById(id);
        if(!findProduct){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        findProduct.image = image || findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price === '' ? 0 : price || findProduct.price
        findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock

        await findProduct.save();
        res.status(200).json({
            success:true,
            data:findProduct,
        })
    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error Occured"
        })
    }
}


//delete a product
const deleteProduct = async(req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }
        res.status(200).json({
            success:true,
            message:'Product Deleted Successfully'
        })

    }catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Error Occured"
        })
    }
}



module.exports = {handleImageUpload,addProduct,deleteProduct,editProduct,fetchAllProducts};