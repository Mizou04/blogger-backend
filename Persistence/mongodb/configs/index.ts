import 'dotenv/config'
import mongoose from "mongoose";

export default async function dbConnect(){
  mongoose.set("strictQuery", false);
  console.log(process.env.MONGO_URI)
  mongoose.connect(`${process.env.MONGO_URI}`, (err)=>{
    if(err) console.error(err)
    else 
      console.log("db connected")
  })

}