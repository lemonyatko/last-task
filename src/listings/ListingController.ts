import { Request, Response, NextFunction } from "express";
import UserService from "../users/UserService";
import { IListing } from "./database/listing/ListingSchema";
import { ListingDto } from "./listingDto/ListingDto";
import ListingService from "./ListingService";


class ListingController {
    async createListing(req: Request, res: Response, next: NextFunction) {
        try {
            const { user, title, description }: IListing = req.body;
            const listingData = await ListingService.createListing({ user, title, description });
            return res.json(listingData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }

    async updateListing(req: Request, res: Response, next: NextFunction) {
        try {
            const { user, title, description, _id }: IListing = req.body;
            const listingDto = new ListingDto({ user, title, description, _id });
            const updatedListingData = await ListingService.changeListingData(listingDto);
            if (!updatedListingData) {
                return res.status(403).json({ message: 'Access denied' });
            }
            return res.json(updatedListingData);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }

    async getListings(req: Request, res: Response, next: NextFunction) {
        try {
            const listings = await ListingService.getAllListings();
            return res.json(listings);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: 'Unexpected error' });
        }
    }

    async deleteListing(req: Request, res: Response, next: NextFunction) {
        const { user, _id }: IListing = req.body;
        const isDeleted = await ListingService.deleteListingById(user.toString(), _id);

        if (!isDeleted) {
            return res.status(404).json({ message: "The deletion operation failed" });
        }
        return res.status(204);
    }
}

export default new ListingController();