const mongoose = require('mongoose')
async function connectDB(){
    try{
        mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"FashionDeals"
        })
        console.log("DB is connected")
    }   
    catch{
        console.log("DB is not connected")
    }
}

module.exports = connectDB;