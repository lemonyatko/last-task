import { UserRepository } from "../users/database/user/UserRepository";
import { ListingRepository } from "./database/listing/ListingRepository";
import { IListingDto, ListingDto } from "./listingDto/ListingDto";

export type listingData = {
    user: string,
    title: string,
    description: string,
    images: Image[];
}
export type Image = {
    belongingType: 'listing' | 'category',
    url: string,
}
type payload = {
    _id: string;
    user: string;
    title: string;
    description: string;
    images: Image[];
}
class ListingService {
    async createListing(listingData: listingData) {
        const user = await UserRepository.findUserById(listingData.user);
        if (!user?.isActivated) return;

        const listing = await ListingRepository.create(listingData);
        const listingDto = new ListingDto(listing);

        return {
            listing: listingDto
        };
    }

    async changeListingData(payload: payload) {
        const listing = await ListingRepository.findById(payload._id);
        if (!listing) return;

        const user = await UserRepository.findUserById(payload.user);
        if (!user) return;

        const isCreator = listing?.user.toString() === payload.user;
        if (isCreator) {
            const { title, description } = payload;
            await ListingRepository.updateData(listing, title, description);

            const listingDto = new ListingDto(listing);
            return {
                listing: listingDto
            }
        }
        return false;
    }

    async deleteListingById(userId: string, listingId: string) {
        const user = await UserRepository.findUserById(userId);
        if (!user) return;

        const listing = await ListingRepository.findById(listingId);
        if (!listing) return;

        const isCreator = listing?.user.toString() === user._id.toString();
        const isAdmin = user.userType === "admin";
        if (isCreator || isAdmin) {
            const deletedResult = await ListingRepository.deleteById(listingId);
            if (deletedResult) return true;
        }
        return false;
    }

    async getAllListings() {
        const listings = await ListingRepository.findAllAndPopulate();
        const result: IListingDto[] = [];
        listings.forEach(listing => result.push(new ListingDto(listing)));
        return result;
    }
}

export default new ListingService();