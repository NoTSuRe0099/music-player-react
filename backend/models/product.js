import mongoose from "mongoose";
const Schema = mongoose.Schema;
import { APP_URL } from "../config";

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        artist: { type: String, required: true },
        audio: {
            type: String,
            required: true,
            get: (audio) => {
                // http://localhost:5000/uploads/1616443169266-52350494.mp3
                if (process.env.ON_HEROKU == "true") {
                    return `${audio}`;
                }
                return `${APP_URL}/${audio}`;
            },
        },
    },
    { timestamps: true, toJSON: { getters: true }, id: false }
);

export default mongoose.model("Product", productSchema, "products");
