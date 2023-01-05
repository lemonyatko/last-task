import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/Errors";
import TelegrafService from "../telegraf/TelegrafService";
import TokenService from "../token/TokenService";
import { IUser } from "./database/user/UserSchema";
import { IUserDto } from "./userDto/UserDto";
import UserService from "./UserService";

class UserController {
    async signup(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, name, phone, password }: IUser = req.body;
            const userData = await UserService.signup({ email, name, phone, password });
            if (!userData) throw ApiError.BadRequest("The client already exists");
            await TelegrafService.sendActivation(userData.user);
            return res.json(userData); //for debug
            // return res.status(200);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async signin(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password }: IUser = req.body;
            const userData = await UserService.signin(email, password);
            if (!userData) throw ApiError.BadRequest('Wrong username or password');
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) throw ApiError.UnauthorizedError();
            const userData = await UserService.refresh(refreshToken);
            if (!userData) throw ApiError.UnauthorizedError();
            if (userData === 'false') throw ApiError.BadRequest('The client doesn\'t exist');
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json(userData);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const { refreshToken } = req.cookies;
            await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json('Logout successful');
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    async deleteUserAndListings(req: Request, res: Response, next: NextFunction) {
        try {
            const userIdFromJWT = UserController.authorize(req);
            const { _id }: IUserDto = req.body;

            const isDeleted = await UserService.deleteAllUserData(userIdFromJWT, _id);
            if (!isDeleted) throw ApiError.NotFound();
            return res.status(204).send();
        } catch (err) {
            console.log(err);
            next(err);
        }
    }

    static authorize(req: Request) {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw ApiError.UnauthorizedError();

        const [, accessToken] = authHeader.split(' ');
        if (!accessToken) throw ApiError.UnauthorizedError();

        const userDataFromJWT = TokenService.validateAccessToken(accessToken);
        if (!userDataFromJWT) throw ApiError.UnauthorizedError();
        return userDataFromJWT.userId;
    }
}

export default new UserController();