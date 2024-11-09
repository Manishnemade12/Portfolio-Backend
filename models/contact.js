
import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const ContactSchema = new Schema({ 
    name: { type: String, required: true  },
    lname: { type: String },
    email: { type: String }, 
    company: { type: String },
    phone: { type: String },
    country: { type: String },
    price: { type: String },
    description: { type: String },
    project: [{ type: String }],
},{
    timestamps: true,
});

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
