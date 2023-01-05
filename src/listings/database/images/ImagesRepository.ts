import { Image } from "../../ListingService";
import { ImagesModel } from "./ImagesSchema";

class ImagesRepository {
    static async findImagesByListingId(id: string) {
        return await ImagesModel.find({ listing: id });
    }

    static async findAll() {
        return await ImagesModel.find().populate('listing');
    }

    static async createImagesForListing(image: Image) {
        return await ImagesModel.create(image);
    }
}

export { ImagesRepository };