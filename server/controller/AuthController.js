import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const maxAge = 3*24*60*60*1000;

const createToken = async(email,userId)=>{
    return jwt.sign({email,userId},
        process.env.JWT_SECRET,
        { expriresIN:maxAge }
    )
};


export  const signUp = async (req, res, next)=>{
    try {
        const { email, password } = req.body;
        if(!email||!password){
            return res.status(500).send("email and password is required")
        }

        const user = await User.create({
            email, password
        });
        res.cookie("jwt",createToken(user.email,user._id),{
            maxAge,
            secure:true,
            sameSite:"None"
        });
        return res.status(201).json({
            user:{
                id:user._id,
                email:user.email,
                profileSetup:user.profileSetup,
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error");
    }
};
