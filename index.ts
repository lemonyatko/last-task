import express, { request, response } from "express";
import { config } from "./src/config";
import { connectToDB } from "./src/database";
import { listingRouter } from "./src/listings/LinstingRouter";
import { userRouter } from "./src/users/UserRouter";

const app = express();
app.use(express.json());
app.use('/api', userRouter);
app.use('/api', listingRouter);

(async function startApp() {
    try {
        await connectToDB();

        app.listen(config.PORT, () => {
            console.log(`app's listening ${config.PORT}`);
        });
    } catch (error) {
        console.log("Error happened (startApp) \n", error);
    }
})();