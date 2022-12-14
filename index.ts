import cookieParser from "cookie-parser";
import express from "express";
import { config } from "./src/config";
import { connectToDB } from "./src/database";
import { errorMiddleware } from "./src/exceptions/ErrorsMiddleware";
import { listingRouter } from "./src/listings/LinstingRouter";
import { telegraf } from "./src/telegraf/TelegrafBot";
import { userRouter } from "./src/users/UserRouter";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRouter);
app.use('/api', listingRouter);
app.use(errorMiddleware);

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


(async () => {
    try {
        await telegraf.setup().launch();
    } catch (error) {
        console.log("Bot startup error\n", error);
    }
})();

