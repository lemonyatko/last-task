import { Request, Response, NextFunction } from "express";
import { IUser } from "./database/user/UserSchema";
import UserService from "./UserService";

class UserController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name, phone }: IUser = req.body;
            const isExist = await UserService.checkExistence(email);
            if (!isExist) return res.status(400).json("The client already exists");

            const userData = await UserService.createUser({ email, name, phone });
            return res.json(userData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }


    async deleteUserAndListings(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req.body;
            const isDeleted = await UserService.deleteAllUserData(user);
            if (!isDeleted) {
                return res.status(404).json({ message: "The deletion operation failed" });
            }
            return res.status(204);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }
}

export default new UserController();