import type { Request, Response } from "express";
import { DocomentModel } from "../config/models/DocomentModel.js";

export const Docomentservices=async(req:Request,res:Response)=>{
await DocomentModel.create({docoment:req.body.docoment}) 
return res.status(200).json({success:true,"message":"Docoment save successfully"})
} 
export const GetDocomentservices=async(req:Request,res:Response)=>{
const getDocoment=await DocomentModel.find()
return res.status(200).json({success:true,"message":"Docoment save successfully",getDocoment})

}