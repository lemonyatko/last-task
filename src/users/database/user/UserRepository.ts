import { ListingRepository } from "../../../listings/database/listing/ListingRepository";
import { UserModel } from "./UserSchema";

class UserRepository {
    static async createUser(userData: object) {
        return await UserModel.create(userData);
    }

    static async findClientByEmail(email: string) {
        return await UserModel.findOne({ email });
    }

    static async findClientById(id: string) {
        return await UserModel.findById(id);
    }

    static async deleteAllUserData(userId: string) {
        const deletedUserResult = await UserModel.deleteOne({ _id: userId });
        const deletedListingsResult = await ListingRepository.deleteAllListings(userId);
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

    static async findOneClient(link: string) {
        return await UserModel.findOne({ subscribeLink: link });
    }
}

export { UserRepository };