import { UserModel } from "./UserSchema";

class UserRepository {
    static async createUser(userData: object) {
        return await UserModel.create(userData);
    }

    static async findClientByEmail(email: string) {
        return await UserModel.findOne({ email });
    }
}

export { UserRepository };