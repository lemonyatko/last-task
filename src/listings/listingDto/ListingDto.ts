import { IListing } from "../database/listing/ListingSchema";


interface IListingDto {
    user: object | string;
    title: string;
    description: string;
    _id: string;
}

class ListingDto implements IListingDto {
    user: object | string;
    title: string;
    description: string;
    _id: string;

    constructor(listingData: IListing) {
        this.user = listingData.user;
        this.title = listingData.title;
        this.description = listingData.description;
        this._id = listingData._id;
    }
}

export { IListingDto, ListingDto };
