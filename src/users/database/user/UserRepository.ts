import { ListingRepository } from "../../../listings/database/listing/ListingRepository";
import { ListingModel } from "../../../listings/database/listing/ListingSchema";
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
}

export { UserRepository };