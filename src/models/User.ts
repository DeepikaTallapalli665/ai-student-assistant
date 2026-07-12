import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
{
    googleId: String,
    name: String,
    email: String,
    photo: String,
},
{
    timestamps: true,
});

export default mongoose.model("User", UserSchema);