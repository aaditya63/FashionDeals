const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../../models/user');

//register
exports.registerUser = async (req,res)=>{
    const {userName,email,password} = req.body;

    try{

        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.json({
                success:false,
                message:"User Already Registered!"
            })
        }

        const hashPassword = await bcrypt.hash(password,10);
        const newuser = new User({
            userName,email,password:hashPassword
        })
        await newuser.save();
        res.status(200).json({
            success:true,
            message:"Registration Successfull"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Some Error Occured",
            success:"false"
        })
    }
}



//login
exports.login = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.status(400).json({
                success:false,
                message:"User doesn't Exist! Please Register!"
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password,checkUser.password)

        if(!checkPasswordMatch){
            return res.json({
                success:false,
                message:"Incorrect Password! Please Try Again"
            })
        }

        const token = jwt.sign({
            id:checkUser._id,
            role:checkUser.role,
            email : checkUser.email
        },process.env.JWT_KEY,{
            expiresIn:'60m'
        })

        res.cookie('token',token,{
            httpOnly:true,
            secure:false
        })
        res.status(200).json({
            success:true,
            message:'Logged in Successfully',
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id
            }
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            message:"Some Error Occured",
            success:false
        })
    }
}


//logout

exports.logout = async(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:"Logged out Successfullly!"
    })
}


//auth-middleware  || for verify everytime website refreshes

exports.authMiddleware = async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorised user!"
        })
    } 

    try{
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.user = decoded;
        next()
    }catch(error){
        res.status(401).json({
            success:false,
            message:"Unauthorised user "
        })
    }
}