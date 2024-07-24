import { Router } from "express";
import { Login, signUp } from "../controller/AuthController.js";


const authRoutes = Router();

  authRoutes.post("/signup",signUp);
  authRoutes.post("/login",Login);

  export default authRoutes;