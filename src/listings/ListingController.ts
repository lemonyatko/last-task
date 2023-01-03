import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/Errors";
import TelegrafService from "../telegraf/TelegrafService";
import TokenService from "../token/TokenService";
import { IListingDto, ListingDto } from "./listingDto/ListingDto";
import ListingService from "./ListingService";

class ListingController {
    async createListing(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description }: IListingDto = req.body;
            const userIdFromJWT = ListingController.authorize(req);
            const listingData = await ListingService.createListing({ user: userIdFromJWT, title, description });
            if (!listingData) throw ApiError.AccessDenied();
            await TelegrafService.sendListingNotification(listingData.listing);
            return res.json(listingData);
        } catch (err) {
            next(err);
        }
    }

    async updateListing(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, description, _id }: IListingDto = req.body;
            const userIdFromJWT = ListingController.authorize(req);

            const listingDto = new ListingDto({ user: userIdFromJWT, title, description, _id });
            const updatedListingData = await ListingService.changeListingData(listingDto);
            if (!updatedListingData) throw ApiError.AccessDenied();
            return res.json(updatedListingData);
        } catch (err) {
            next(err);
        }
    }

    async getListings(req: Request, res: Response, next: NextFunction) {
        try {
            const listings = await ListingService.getAllListings();
            return res.json(listings);
        } catch (err) {
            next(err);
        }
    }

    async deleteListing(req: Request, res: Response, next: NextFunction) {
        const { _id }: IListingDto = req.body;
        const userIdFromJWT = ListingController.authorize(req);
        const isDeleted = await ListingService.deleteListingById(userIdFromJWT, _id);

        if (!isDeleted) throw ApiError.NotFound();
        return res.status(204).send();
    }

    static authorize(req: Request) {
        const authHeader = req.headers.authorization;
        if (!authHeader) throw ApiError.UnauthorizedError();

        const [, accessToken] = authHeader.split(' ');
        if (!accessToken) throw ApiError.UnauthorizedError();

        const userDataFromJWT = TokenService.validateAccessToken(accessToken);
        if (!userDataFromJWT) throw ApiError.UnauthorizedError();
        return userDataFromJWT.userId;
    }
}

export default new ListingController();