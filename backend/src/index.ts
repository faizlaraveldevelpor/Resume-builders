import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookie_parser from 'cookie-parser'


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
app.listen(process.env.TOKEN,()=>{
    console.log("server is on",process.env.TOKEN);
    
})
