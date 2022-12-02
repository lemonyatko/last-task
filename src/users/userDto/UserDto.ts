import { IUser } from "../database/user/UserSchema";

interface IUserDto {
    email: string;
    name: string;
    phone: string;
    userType: string;
    _id: string;
    isActivated: boolean;
}

class UserDto implements IUserDto {
    email: string;
    name: string;
    phone: string;
    userType: string;
    _id: string;
    isActivated: boolean;

    constructor(userData: IUser) {
        this.email = userData.email;
        this.name = userData.name;
        this.phone = userData.phone;
        this.userType = userData.userType;
        this._id = userData._id;
        this.isActivated = userData.isActivated;
    }
}

export { IUserDto, UserDto };