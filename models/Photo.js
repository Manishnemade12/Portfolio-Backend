
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const PhotosSchema = new Schema({ 
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
},{
    timestamps: true,
});

const Photos = models.Photos || model('Photos', PhotosSchema);

export default Photos;
