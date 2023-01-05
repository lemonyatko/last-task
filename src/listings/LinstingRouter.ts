import { Router } from "express";
import ListingController from "./ListingController";

const listingRouter = Router();

listingRouter.post('/listing', ListingController.createListing);
listingRouter.put('/listing', ListingController.changeListing);
listingRouter.get('/listing', ListingController.getListings);
listingRouter.delete('/listing', ListingController.deleteListing);

export { listingRouter };