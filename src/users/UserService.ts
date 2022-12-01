import { UserRepository } from "./database/user/UserRepository";
import { UserDto } from "./userDto/UserDto";

type userData = {
    email: string,
    name: string,
    phone: string
}
class UserService {
    async createUser(userData: userData) {
        const client = await UserRepository.findClientByEmail(userData.email);
        if (client) return false;

        const user = await UserRepository.createUser({ ...userData, userType: "client" });
        const userDto = new UserDto(user);
        return {
            user: userDto
        }
    }
}

export default new UserService();