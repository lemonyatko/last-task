import { IUser } from "../database/user/UserSchema";

interface IUserDto {
    email: string;
    name: string;
    phone: string;
    userType: string;
    id: string;
}

class UserDto implements IUserDto {
    email: string;
    name: string;
    phone: string;
    userType: string;
    id: string;

    constructor(userData: IUser) {
        this.email = userData.email;
        this.name = userData.name;
        this.phone = userData.phone;
        this.userType = userData.userType;
        this.id = userData._id;
    }
}

export { IUserDto, UserDto };