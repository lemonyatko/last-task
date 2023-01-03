import { IListingDto } from "../listings/listingDto/ListingDto";
import { eventsEmitter } from "../telegraf/TelegrafBot";
import { IUserDto } from "../users/userDto/UserDto";

class TelegrafService {
    async sendActivation(userData: IUserDto) {
        eventsEmitter.emit('signup', userData);
    }

    async sendListingNotification(listing: IListingDto) {
        eventsEmitter.emit('createListing', listing);
    }
}

export default new TelegrafService();