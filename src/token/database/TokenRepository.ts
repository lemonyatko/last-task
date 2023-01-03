import { TokenModel } from "./TokenSchema";

class TokenRepository {
    static async createRefreshToken(userId: string, refreshToken: string) {
        return await TokenModel.create({ user: userId, refreshToken });
    }
    static async findRefreshTokenByUserId(id: string) {
        return await TokenModel.findOne({ user: id });
    }
    static async deleteRefreshToken(refreshToken: string) {
        return await TokenModel.deleteOne({ refreshToken });
    }
    static async findRefreshToken(refreshToken: string) {
        return await TokenModel.findOne({ refreshToken });
    }

    static async deleteExpiredRefreshTokenRecordsForUser(userId: string) {
        return await TokenModel.deleteMany({ user: userId });
    }
}

export { TokenRepository };