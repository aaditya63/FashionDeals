const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/db')



const PORT = process.env.PORT || 5000;
const app = express()
dotenv.config()

app.use(cookieParser())
app.use(express.json())
app.use(
    cors({
        origin : 'http://localhost:5173',
        methods : ['GET','POST','DELETE','PUT'],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials : true
    })
)



connectDB();

app.listen(PORT,()=>{
    console.log("Server Started")
})
