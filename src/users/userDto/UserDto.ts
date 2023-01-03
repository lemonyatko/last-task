import { IUser } from "../database/user/UserSchema";

interface IUserDto {
    email: string;
    name: string;
    phone: string;
    userType: string;
    _id: string;
    isActivated: boolean;
    subscribed: boolean;
    subscribeLink: string;
}

class UserDto implements IUserDto {
    email: string;
    name: string;
    phone: string;
    userType: string;
    _id: string;
    isActivated: boolean;
    subscribed: boolean;
    subscribeLink: string;

    constructor(userData: IUser) {
        this.email = userData.email;
        this.name = userData.name;
        this.phone = userData.phone;
        this.userType = userData.userType;
        this._id = userData._id.toString();
        this.isActivated = userData.isActivated;
        this.subscribed = userData.subscribed;
        this.subscribeLink = userData.subscribeLink;
    }
}

export { IUserDto, UserDto };