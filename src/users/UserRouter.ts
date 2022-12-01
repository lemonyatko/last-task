import { Router } from "express";
import UserController from "./UserController";
const userRouter = Router();

userRouter.post('/signup', UserController.signup);

export { userRouter };