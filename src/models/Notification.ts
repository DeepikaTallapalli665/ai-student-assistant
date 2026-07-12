import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
{
    email: String,
    title: String,
    message: String,
    read: {
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
});

export default mongoose.model("Notification", NotificationSchema);