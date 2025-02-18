const express = require("express");
const { upload } = require("../../config/cloudinary");
const handleImageUpload = require("../../controllers/admin/products-controllers");



const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);


module.exports = router;