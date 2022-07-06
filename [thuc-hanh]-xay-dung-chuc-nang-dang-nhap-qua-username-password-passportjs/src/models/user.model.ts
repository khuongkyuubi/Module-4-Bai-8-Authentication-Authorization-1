import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, maxlength: 100},
    password: {type: String, required: true, maxlength: 150}
})

const userModel = mongoose.model("User", userSchema);
export default userModel;