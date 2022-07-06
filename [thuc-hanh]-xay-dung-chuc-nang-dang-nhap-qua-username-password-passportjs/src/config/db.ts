import mongoose from "mongoose";

const DB_URL = process.env.DB_URL || "";
export default async function connectDB() {

    try {
        await mongoose.connect(DB_URL);
        console.log('DB Connected!');
    } catch (error) {
        console.log('DB connection error:', error.message)
    }
}
