import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookie_parser from 'cookie-parser'
import { DB } from './config/DB.js'
import { DocomentRoutes } from './routes/docomentroutes.js'


const app=express()
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookie_parser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ path: "./secure.env" });
app.use('/api/v1',DocomentRoutes)
app.listen(process.env.TOKEN,()=>{
    console.log("server is on",process.env.TOKEN);
    DB()
    
})
