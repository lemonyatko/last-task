import { Request, Response, NextFunction } from "express";
import { IUser } from "./database/user/UserSchema";
import UserService from "./UserService";

class UserController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name, phone }: IUser = req.body;
            const userData = await UserService.createUser({ email, name, phone });
            if (!userData) return res.status(400).json("The client already exists");
            return res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Some error' });
        }
    }
}

export default new UserController();