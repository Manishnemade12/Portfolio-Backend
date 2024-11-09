
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const projectSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    client: { type: String },
    // projectcategory: { type: String },
    projectcategory: {
        type: [String], 
        required: true
    },
    tags: [{ type: String }],
    livepreview: { type: String },
    status: { type: String },


}, {
    timestamps: true,
});

const Project = models.Project || model('Project', projectSchema);

export default Project;
