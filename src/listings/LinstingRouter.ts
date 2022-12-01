import { Router } from "express";
import ListingController from "./ListingController";

const listingRouter = Router();

listingRouter.post('/test', ListingController.send);

export { listingRouter };