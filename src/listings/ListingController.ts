import { Request, Response, NextFunction } from "express";

class ListingController {
    async send(req: Request, res: Response, next: NextFunction) {
        try {
            res.json("test")
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Some error' });
        }
    }
}

export default new ListingController();