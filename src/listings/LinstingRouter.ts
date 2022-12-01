import { Router } from "express";
import ListingController from "./ListingController";

const listingRouter = Router();

listingRouter.post('/listing', ListingController.createListing);
listingRouter.post('/listing/update', ListingController.updateListing);
listingRouter.get('/listing', ListingController.getListings);
listingRouter.delete('/listing', ListingController.deleteListing);

export { listingRouter };