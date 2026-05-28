import mongoose from "mongoose";

const connectDB = async ()=>{
   try{
     await mongoose.connect("mongodb://localhost:27017/employee")
    console.log("Database connected")
   }catch(err){
    console.log("Error connected Database")
    process.exit(1)
   }
}

export default connectDB;