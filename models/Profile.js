import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const profileSchema = new Schema({
    email: { type: String },
    password: { type: String },
   
},{
    timestamps: true,
});

export const Profile = models.Profile || model('Profile', profileSchema, 'admin');