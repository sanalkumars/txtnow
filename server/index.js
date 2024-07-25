import express from 'express'
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/AuthRoute.js';

dotenv.config();

const app = express();

const port= process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URL;

// cors middleware
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRoutes);



 const server = app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
 });


 mongoose.connect(process.env.MONGO_URL)
 .then(() => {
     console.log("mongodb connected");
 })
 .catch((error) => {
     console.log("failed to connect to mongodb", error);
 });

