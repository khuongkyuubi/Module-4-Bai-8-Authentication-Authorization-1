import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, maxLength: 100},
    password: {type: String, maxLength: 150},
    google: {
        id: {type: String}
    }
});
const userModel = mongoose.model("User2", userSchema);

export {userSchema, userModel}