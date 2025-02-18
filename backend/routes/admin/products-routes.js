const express = require("express");
const { upload } = require("../../config/cloudinary");
const {handleImageUpload, addProduct, editProduct, deleteProduct, fetchAllProducts} = require("../../controllers/admin/products-controllers");



const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload)
router.post("/add",addProduct)
router.put("/edit/:id",editProduct)
router.delete("/delete/:id",deleteProduct)
router.get("/get",fetchAllProducts)

module.exports = router;