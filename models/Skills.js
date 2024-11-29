import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const SkillsSchema = new Schema({
    title: { type: String },
    images: [{ type: String }],
    description: { type: String }
}, {
    timestamps: true,
});
const Skills = models.Skills || model('Skills',SkillsSchema);

export default Skills;
