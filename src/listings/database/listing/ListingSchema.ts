import { model, Schema } from "mongoose";

interface IListing {
    _id: string;
    user: Schema.Types.ObjectId | string;
    title: string;
    description: string;
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
    description: {
        type: String,
        required: true,
    }
});

const ListingModel = model<IListing>('Listing', ListingSchema);

export { IListing, ListingModel };