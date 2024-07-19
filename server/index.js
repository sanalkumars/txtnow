import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const port= process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

 const server = app.listen(port,()=>{
    console.log(`server running at http://localhost:{port}`);
 });

mongoose.connect(mongoUrl)
.then(()=>{
    console.log("database connected successfully");
}).catch(err=>console.log(err));

