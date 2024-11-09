// import mongoose from 'mongoose';

// const educationSchema = new mongoose.Schema({
//     school: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     year: {
//         type: String,  // Use String for flexible year formats like "2020-2024"
//         required: true
//     }
// }, { _id: false });  // Avoid creating an id for each education item

// const profileSchema = new mongoose.Schema({
//     education: {
//         type: [educationSchema],  // An array of education items
//         default: Array.from({ length: 4 }, () => ({ school: '', description: '', year: '' }))
//     }
// }, {
//     timestamps: true  // Adds createdAt and updatedAt fields automatically
// });

// export default mongoose.models.education || mongoose.model('education', profileSchema);
import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    school: {
        type: String,
        required: true
    },
    educationDescription: {
        type: String,
        required: true
    },
    year: {
        type: String,  // Use String for flexible year formats like "2020-2024"
        required: true
    }
}, { _id: false });  // Avoid creating an id for each education item

const profileSchema = new mongoose.Schema({
    education: {
        type: [educationSchema],  // An array of education items
        default: Array.from({ length: 4 }, () => ({ school: '', educationDescription: '', year: '' }))
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
});

export default mongoose.models.Education || mongoose.model('Education', profileSchema);
