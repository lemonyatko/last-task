import { Document, ObjectId } from "mongoose";
import { ListingRepository } from "../../../listings/database/listing/ListingRepository";
import { IUser, UserModel } from "./UserSchema";

type user = Document<unknown, any, IUser> & IUser & Required<{
    _id: ObjectId;
}>
class UserRepository {
    static async createUser(userData: object) {
        return await UserModel.create(userData);
    }

    static async findUserByEmail(email: string) {
        return await UserModel.findOne({ email });
    }

    static async findUserById(id: string) {
        return await UserModel.findById(id);
    }

    static async deleteAllUserData(userId: string) {
        const deletedUserResult = await UserModel.deleteOne({ _id: userId });
        const deletedListingsResult = await ListingRepository.deleteAllByUserId(userId);
        return {
            deletedUserResult,
            deletedListingsResult
        }
    }

    static async findAdmin(telegramId: number) {
        return await UserModel.findOne({ telegramId });
    }

    static async findAdmins() {
        return await UserModel.find({ userType: 'admin' });
    }

    static async findSubscribedUsers() {
        return await UserModel.find({ subscribed: true, userType: 'client' });
    }

    static async findUser(link: string) {
        return await UserModel.findOne({ subscribeLink: link });
    }

    static async subscribeUser(user: user, telegramId: string) {
        user.telegramId = telegramId;
        user.subscribed = true;
        await user.save();
    }

    static async activateUser(user: user) {
        user.isActivated = true;
        await user.save();
    }
}

export { UserRepository };