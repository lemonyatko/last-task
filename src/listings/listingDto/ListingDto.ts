import { ObjectId } from "mongoose";
import { IListing } from "../database/listing/ListingSchema";
import { Image } from "../ListingService";


interface IListingDto {
    user: object | string;
    title: string;
    description: string;
    _id: string;
    images: Image[] | ObjectId[];
}

class ListingDto implements IListingDto {
    user: object | string;
    title: string;
    description: string;
    _id: string;
    images: Image[] | ObjectId[];

    constructor(listingData: IListing) {
        this.user = listingData.user;
        this.title = listingData.title;
        this.description = listingData.description;
        this._id = listingData._id;
        this.images = listingData.images;
    }
}

export { IListingDto, ListingDto };
