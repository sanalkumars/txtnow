import { Router } from "express";
import { signUp } from "../controller/AuthController.js";


const authRoutes = Router();

  authRoutes.post(".signup",signUp);

  export default authRoutes;