import mongoose from 'mongoose'
export const DB=async()=>{
 await mongoose.connect(process.env.URL as string)
 console.log("DB is connect");
 
}