import type { Request, Response } from "express";
import { Docomentservices, GetDocomentservices } from "../services/Docomentservices.js";

export const DocomentSave=async(req:Request,res:Response)=>{
    
    
Docomentservices(req,res)
}
export const GetDocoment=async(req:Request,res:Response)=>{
    GetDocomentservices(req,res)
}