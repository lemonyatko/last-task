import { UserRepository } from "../../../users/database/user/UserRepository";
import { IListingDto } from "../../listingDto/ListingDto";
import { ListingModel } from "./ListingSchema";

class ListingRepository {
    static async createListing(listingData: object) {
        return await ListingModel.create(listingData);
    }

    static async findListingById(id: string) {
        return await ListingModel.findById(id);
    }

    static async updateListingData(payload: IListingDto) {
        const listing = await this.findListingById(payload._id);

        if (!listing) return;

        const user = await UserRepository.findClientById(payload.user.toString());
        if (!user) return;

        const isCreator = listing?.user.toString() === payload.user.toString();

        if (isCreator) {
            listing.title = payload.title;
            listing.description = payload.description;
            return listing.save();
        }
        return;
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