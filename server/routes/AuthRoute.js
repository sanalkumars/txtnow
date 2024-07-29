import { Router } from "express";
import { getUserInfo, Login, signin, signUp } from "../controller/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";


const authRoutes = Router();

  authRoutes.post("/signup", signUp );
  authRoutes.post("/login", signin );
  authRoutes.get("/user-info", verifyToken , getUserInfo );

  export default authRoutes;