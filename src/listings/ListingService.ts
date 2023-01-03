import { UserRepository } from "../users/database/user/UserRepository";
import { ListingRepository } from "./database/listing/ListingRepository";
import { IListingDto, ListingDto } from "./listingDto/ListingDto";

type listingData = {
    user: string,
    title: string,
    description: string
}
class ListingService {
    async createListing(listingData: listingData) {
        const user = await UserRepository.findClientById(listingData.user);
        if (!user?.isActivated) return;

        const listing = await ListingRepository.createListing(listingData);
        const listingDto = new ListingDto(listing);

        return {
            listing: listingDto
        };
    }

    async changeListingData(payload: IListingDto) {
        const listing = await ListingRepository.findListingById(payload._id);
        if (!listing) return;

        const user = await UserRepository.findClientById(payload.user.toString());
        if (!user) return;

        const isCreator = listing?.user.toString() === payload.user.toString();
        if (isCreator) {
            listing.title = payload.title;
            listing.description = payload.description;
            await listing.save();

            const listingDto = new ListingDto(listing);
            return {
                listing: listingDto
            }
        }
        return false;
    }

    async deleteListingById(userId: string, listingId: string) {
        const user = await UserRepository.findClientById(userId);
        if (!user) return;

        const listing = await ListingRepository.findListingById(listingId);
        if (!listing) return;

        const isCreator = listing?.user.toString() === user._id.toString();
        const isAdmin = user.userType === "admin";
        if (isCreator || isAdmin) {
            const deletedResult = await ListingRepository.deleteListingById(listingId);
            if (deletedResult) return true;
        }
        return false;
    }

    async getAllListings() {
        return await ListingRepository.findAllListings();
    }
}

export default new ListingService();