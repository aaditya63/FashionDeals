const express = require('express');
const { registerUser, login, logout, authMiddleware } = require('../../controllers/auth/auth');

const router = express.Router();


router.post('/register',registerUser)
router.post('/login',login)
router.post('/logout',logout)
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:"Authenticated User",
        user:user
    })
})


module.exports = router;