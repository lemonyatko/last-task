import { Router } from "express";
import UserController from "./UserController";
const userRouter = Router();

userRouter.post('/signup', UserController.signup);
userRouter.delete('/user', UserController.deleteUserAndListings);

export { userRouter };