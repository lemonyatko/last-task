import { model, Schema } from "mongoose";

interface IImages {
    _id: Schema.Types.ObjectId | string;
    listing: Schema.Types.ObjectId | string;
    belongingType: string;
    url: string;
}

const ImagesSchema = new Schema<IImages>({
    listing: {
        type: Schema.Types.ObjectId,
        ref: 'Listing'
    },
    belongingType: {
        type: String,
        required: true,
        enum: ['listing', 'category']
    },
    url: {
        type: String,
        required: true
    }
});

const ImagesModel = model<IImages>('Images', ImagesSchema);

export { IImages, ImagesModel };