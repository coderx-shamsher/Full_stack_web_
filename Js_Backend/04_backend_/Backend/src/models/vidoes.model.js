import mongoose from "mongoose";
import mongooseAggregate from "mongoose-aggregate-paginate-v2";

const VideosSchema = new mongoose.Schema(
    {
        videoFiles: {
            type: String, // cloudinary url
            required: true,
        },
        thumbnail: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: String,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        ispublished: {
            type: Boolean,
            default: true,
        },
        videoOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

// adding aggregate as plugin 
VideosSchema.plugin(mongooseAggregate) 

export const Video = mongoose.model("Video", VideosSchema);
