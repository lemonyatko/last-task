import { Router } from "express";
import UserController from "./UserController";
const userRouter = Router();

userRouter.post('/signup', UserController.signup);
userRouter.post('/signin', UserController.signin);
userRouter.post('/logout', UserController.logout);
userRouter.get('/refresh', UserController.refresh);
userRouter.delete('/user', UserController.deleteUserAndListings);

export { userRouter };