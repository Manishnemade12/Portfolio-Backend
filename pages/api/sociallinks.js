import { mongooseConnect } from '@/lib/mongoose';
import SocialLink from '@/models/SocialLink';

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === 'POST') {
      const { Instagram, Twitter, Linkedin, Github, personalweb } = req.body;

      // Check if social links already exist
      const existingSocialLinks = await SocialLink.findOne({});
      if (existingSocialLinks) {
        // If social links exist, update them
        existingSocialLinks.Instagram = Instagram;
        existingSocialLinks.Twitter = Twitter;
        existingSocialLinks.Linkedin = Linkedin;
        existingSocialLinks.Github = Github;
        existingSocialLinks.personalweb = personalweb;

        await existingSocialLinks.save();
        res.status(200).json({ message: 'Social links updated successfully', data: existingSocialLinks });
      } else {
        // If no social links exist, create new ones
        const newSocialLinks = await SocialLink.create({
          Instagram,
          Twitter,
          Linkedin,
          Github,
          personalweb,
        });
        res.status(200).json({ message: 'Social links created successfully', data: newSocialLinks });
      }

    } else if (method === 'GET') {
      if (req.query?.id) {
        const socialLink = await SocialLink.findById(req.query.id);
        if (socialLink) {
          res.status(200).json(socialLink);
        } else {
          res.status(404).json({ error: 'Social link not found' });
        }
      } else {
        const socialLinks = await SocialLink.findOne({});
        if (socialLinks) {
          res.status(200).json(socialLinks);
        } else {
          res.status(404).json({ error: 'Social links not found' });
        }
      }

    } else if (method === 'PUT') {
      const { _id, Instagram, Twitter, Linkedin, Github, personalweb } = req.body;

      console.log("Received Data:", req.body); // Log incoming data

      if (!_id) {
        return res.status(400).json({ error: 'Social link ID is required for updating' });
      }

      const updatedSocialLinks = await SocialLink.findByIdAndUpdate(
        _id,
        { Instagram, Twitter, Linkedin, Github, personalweb },
        { new: true }
      );

      console.log("Updated Social Links:", updatedSocialLinks); // Confirm updated social link document

      if (updatedSocialLinks) {
        res.status(200).json({ message: 'Social links updated successfully', data: updatedSocialLinks });
      } else {
        res.status(404).json({ error: 'Social link not found' });
      }

    } else if (method === 'DELETE') {
      if (req.query?.id) {
        const deletedSocialLink = await SocialLink.findByIdAndDelete(req.query.id);
        if (deletedSocialLink) {
          res.status(200).json({ message: 'Social link deleted successfully' });
        } else {
          res.status(404).json({ error: 'Social link not found' });
        }
      } else {
        res.status(400).json({ error: 'Social link ID is required for deletion' });
      }

    } else {
      res.setHeader('Allow', ['POST', 'GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
