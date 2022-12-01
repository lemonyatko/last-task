import { connect } from "mongoose";
import { config } from "../config";

async function connectToDB() {
    try {
        await connect(config.DB_URL);
    } catch (error) {
        console.log("DB's error happened\n", error);
    }
}

export { connectToDB };