import { model, Schema } from "mongoose";

interface IUser {
    _id: string;
    email: string;
    name: string;
    phone: string;
    userType: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true
    }
});

const UserModel = model<IUser>('User', UserSchema);

export { IUser, UserModel };