import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days

const createToken = async (email, userId) => {
    return jwt.sign(
        { email, userId },
        process.env.JWT_SECRET,
        { expiresIn: maxAge / 1000 } // expiresIn expects the value in seconds
    );
};

export const signUp = async (request, response, next) => {
    console.log("inside signup function");
    try {
        const { email, password } = request.body;
        console.log(request.body);

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
