import { ListingModel } from "../listings/database/listing/ListingSchema";
import { UserRepository } from "./database/user/UserRepository";
import { UserDto } from "./userDto/UserDto";

type userData = {
    email: string,
    name: string,
    phone: string
}
class UserService {
    async createUser(userData: userData) {
        const user = await UserRepository.createUser({ ...userData, userType: "client" });
        const userDto = new UserDto(user);
        return {
            user: userDto
        }
    }

    async checkExistence(email: string) {
        const client = await UserRepository.findClientByEmail(email);
        if (client) return false;
        return true;
    }

    async deleteAllUserData(id: string) {
        const user = await UserRepository.findClientById(id);
        if (!user) return;

        const isCreator = user._id.toString() === id;
        const isAdmin = user.userType === "admin";

        if (isCreator || isAdmin) {
            const deletedResult = await UserRepository.deleteAllUserData(id);
            if (deletedResult.deletedUserResult || deletedResult.deletedListingsResult) return true;
        }
        return false;
    }
}

export default new UserService();