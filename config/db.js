require("dotenv").config();
const mongoose=require('mongoose')
const connectDB=async()=>{
try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log('db connect');
    
}catch(error){
    console.log('error in connecting db');
}
}
module.exports=connectDB;
