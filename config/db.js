import mongoose from "mongoose";
import "dotenv/config"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected DB");
    } catch (error) {
        console.log("Disconnected DB")
    }
};


export default connectDB;