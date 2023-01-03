import { sign, verify } from "jsonwebtoken";
import { config } from "../config";
import { TokenRepository } from "./database/TokenRepository";

class TokenService {
    generateTokens(payload: { userId: string }) {
        const accessToken = sign(payload, config.JWT_ACCESS_SECRET, { expiresIn: '20d' });
        const refreshToken = sign(payload, config.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId: string, refreshToken: string) {
        const tokenData = await TokenRepository.findRefreshTokenByUserId(userId);
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return await tokenData.save();
        }

        const token = await TokenRepository.createRefreshToken(userId, refreshToken);
        return token;
    }

    async removeRefreshToken(refreshToken: string) {
        await TokenRepository.deleteRefreshToken(refreshToken);
    }

    validateAccessToken(accessToken: string) {
        try {
            const userData = verify(accessToken, config.JWT_ACCESS_SECRET) as { userId: string };
            return userData;
        } catch (error) {
            return null;
        }
    }

    validateRefreshToken(refreshToken: string) {
        try {
            const userData = verify(refreshToken, config.JWT_REFRESH_SECRET) as { userId: string };
            return userData;
        } catch (error) {
            return null;
        }
    }

    async findRefreshToken(refreshToken: string) {
        const tokenData = await TokenRepository.findRefreshToken(refreshToken);
        return tokenData;
    }

    async deleteExpiredRefreshTokenRecordsForUser(userId: string) {
        return await TokenRepository.deleteExpiredRefreshTokenRecordsForUser(userId);
    }
}

export default new TokenService();