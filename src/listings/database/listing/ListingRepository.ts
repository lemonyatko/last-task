import { Document } from "mongoose";
import { listingData } from "../../ListingService";
import { ImagesRepository } from "../images/ImagesRepository";
import { IListing, ListingModel } from "./ListingSchema";

type listing = Document<unknown, any, IListing> & IListing & Required<{
    _id: string;
}>
class ListingRepository {
    static async create(listingData: listingData) {

        const images = await Promise.all(listingData.images.map(image => ImagesRepository.createImagesForListing(image)));
        return await ListingModel.create({ ...listingData, images });
    }

    static async findById(id: string) {
        return await ListingModel.findById(id);
    }

    static async findAll() {
        return await ListingModel.find();
    }

    static async deleteAllByUserId(id: string) {
        return await ListingModel.deleteMany({ user: id });
    }

    static async deleteById(id: string) {
        return await ListingModel.findByIdAndDelete(id);
    }

    static async findAllAndPopulate() {
        return await ListingModel.find().populate('images');
    }

    static async updateData(listing: listing, title: string, description: string) {
        listing.title = title;
        listing.description = description;
        await listing.save();
    }
}

export { ListingRepository };