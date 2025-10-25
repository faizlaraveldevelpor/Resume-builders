import  Express  from "express";
import { upload } from "../utils/multer.js";
import { DocomentSave } from "../controller/Docoment.js";
import { GetDocomentservices } from "../services/Docomentservices.js";
export const DocomentRoutes=Express()
DocomentRoutes.post("/docomentscreate",upload.single("img"),DocomentSave)
DocomentRoutes.get("/docoments",upload.single("img"),GetDocomentservices)