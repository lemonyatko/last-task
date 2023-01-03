import { ListingModel } from "./ListingSchema";

class ListingRepository {
    static async createListing(listingData: object) {
        return await ListingModel.create(listingData);
    }

    static async findListingById(id: string) {
        return await ListingModel.findById(id);
    }

    static async findAllListings() {
        return await ListingModel.find();
    }

    static async deleteAllListings(id: string) {
        return await ListingModel.deleteMany({ user: id });
    }

    static async deleteListingById(id: string) {
        return await ListingModel.findByIdAndDelete(id);
    }
}

export { ListingRepository };