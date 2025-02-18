const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require('./config/db')
const authRouter = require('./routes/auth/auth')
const adminProductsRouter = require('./routes/admin/products-routes')

dotenv.config()


const PORT = process.env.PORT || 5000;
const app = express()

connectDB();

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



app.use('/api/auth',authRouter)
app.use('/api/admin/products',adminProductsRouter)

app.listen(PORT,()=>{
    console.log("Server Started")
})
