import { model, Schema } from "mongoose";

interface IUser {
    _id: Schema.Types.ObjectId;
    email: string;
    name: string;
    password: string;
    phone: string;
    userType: string;
    isActivated: boolean;
    telegramId: string;
    subscribed: boolean;
    subscribeLink: string;
}

const UserSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
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
    },
    isActivated: {
        type: Boolean,
    },
    telegramId: {
        type: String
    },
    subscribed: {
        type: Boolean,
        required: true
    },
    subscribeLink: {
        type: String
    }
});

const UserModel = model<IUser>('User', UserSchema);

export { IUser, UserModel };