import { compare, hash } from "bcrypt";
import { randomUUID } from "crypto";
import TokenService from "../token/TokenService";
import { UserRepository } from "./database/user/UserRepository";
import { IUserDto, UserDto } from "./userDto/UserDto";

type userData = {
    email: string,
    name: string,
    phone: string,
    password: string
}
class UserService {
    async signup(userData: userData) {
        const isExist = await this.checkExistence(userData.email);
        if (isExist) return;

        const hashedPassword = await hash(userData.password, 3);
        userData.password = hashedPassword;
        const subscribeLink = randomUUID();
        const user = await UserRepository.createUser({ ...userData, userType: "client", isActivated: false, subscribed: false, telegramId: null, subscribeLink });
        const userDto = new UserDto(user);

        const tokens = TokenService.generateTokens({ userId: userDto._id });
        await TokenService.saveToken(userDto._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async signin(email: string, password: string) {
        const user = await UserRepository.findClientByEmail(email);
        if (!user) return;

        const isPasswordsEqual = await compare(password, user.password);
        if (!isPasswordsEqual) return;

        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ userId: userDto._id });
        await TokenService.saveToken(userDto._id, tokens.refreshToken);
        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken: string) {
        await TokenService.removeRefreshToken(refreshToken);
    }

    async refresh(refreshToken: string) {
        const userData = TokenService.validateRefreshToken(refreshToken);
        const refreshTokenFromDB = await TokenService.findRefreshToken(refreshToken);
        if (!userData || !refreshTokenFromDB) return;

        const user = await UserRepository.findClientById(userData.userId);
        if (!user) return 'false';
        const userDto = new UserDto(user);
        const tokens = TokenService.generateTokens({ userId: userDto._id });
        return {
            ...tokens,
            user: userDto
        }
    }

    async checkExistence(email: string) {
        const client = await UserRepository.findClientByEmail(email);
        if (client) return true;
        return false;
    }

    async deleteAllUserData(userIdFromJWT: string, userId: string) {
        const user = await UserRepository.findClientById(userIdFromJWT);
        if (!user) return;

        const isCreator = user._id.toString() === userId;
        const isAdmin = user.userType === "admin";

        if (isCreator || isAdmin) {
            const deletedResult = await UserRepository.deleteAllUserData(userIdFromJWT);
            if (deletedResult.deletedUserResult || deletedResult.deletedListingsResult) return true;
        }
        return false;
    }
}

export default new UserService();