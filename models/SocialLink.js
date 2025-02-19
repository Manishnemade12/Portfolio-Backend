import mongoose from 'mongoose';

const SocialLinkSchema = new mongoose.Schema({
  Instagram: { type: String, required: true },
  Twitter: { type: String, required: true },
  Linkedin: { type: String, required: true },
  Github: { type: String, required: true },
  personalweb: { type: String, required: true },
});

export default mongoose.models.SocialLink || mongoose.model('SocialLink', SocialLinkSchema);
