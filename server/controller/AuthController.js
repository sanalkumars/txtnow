import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { compare } from "bcrypt";


const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days

const createToken = async (email, userId) => {
    return jwt.sign(
        { email, userId },
        process.env.JWT_SECRET,
        { expiresIn: maxAge / 1000 } // expiresIn expects the value in seconds
    );
};

export const signUp = async (request, response, next) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(500).send("email and password are required");
        }

        const user = await User.create({
            email, password
        });
        response.cookie("jwt", await createToken(user.email, user._id), {
            maxAge,
            secure: true,
            sameSite: "None"
        });
        return response.status(201).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send("Internal Server Error");
    }
};


//  function for login

export const Login = async(req, res, next)=>{
    try {
        const{email , password} =req.body;
        if(!email || !password){
            return res.status(400).send("Email and Password are required!!!");
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).send("User not Found!!!");
        }
        const auth = await compare(password,user.password);
        if (!auth) {
            return res.status(400).send("Wrong Email Or Password!!!");
        }

        res.cookie("jwt", await createToken(user.email, user._id), {
            maxAge,
            secure: true,
            sameSite: "None"
        });

        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                profileSetup: user.profileSetup,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.image,
                color:user.color,
            }
        });

    } catch (error) {
        
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    if (!email || !password || email === "" || password === "") {
        return next(errorHandler(400, "All fields are required!!!"));
    }

    try {
        const validUser = await User.findOne({ email });

        if (!validUser) {
            return next(errorHandler(404, "User not found!!!"));
        }

        const validPassword = bcryptjs.compareSync(password, validUser.password);

        if (!validPassword) {
            return next(errorHandler(404, "Wrong Credentials!!!"));
        }

        const token = jwt.sign(
            { id: validUser._id, email: validUser.email }, 
            jwtSecret,
            
        );

        const { password: pass, ...rest } = validUser.toObject();

        res.status(200)
            .cookie('access_token', token, { httpOnly: true ,maxAge: 24 * 60 * 60 * 1000, })
            .json({ ...rest, token });

    } catch (error) {
        next(error);
    }
};




export const getUserInfo = async(request , response , next )=>{
    try {
        

        // return res.status(200).json({
        //     user: {
        //         id: user._id,
        //         email: user.email,
        //         profileSetup: user.profileSetup,
        //         firstName:user.firstName,
        //         lastName:user.lastName,
        //         image:user.image,
        //         color:user.color,
        //     }
        // });

    } catch (error) {
        
    }

}