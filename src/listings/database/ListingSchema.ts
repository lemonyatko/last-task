import { model, Schema, Types } from "mongoose";

interface IListing {
    user: Types.ObjectId;
    title: string;
    desciption: string;
}

const ListingSchema = new Schema<IListing>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    desciption: {
        type: String,
        required: true,
    }
});

const ListingModel = model<IListing>('Listing', ListingSchema);

export { IListing, ListingModel };