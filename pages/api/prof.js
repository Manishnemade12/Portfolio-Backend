import { mongooseConnect } from '@/lib/mongoose';
import prof from '@/models/prof';

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'POST') {
            const { name, email, description, profession, work1Title, work1Description, work2Title, work2Description, work3Title, work3Description, work4Title, work4Description, images } = req.body;

            const existingProfile = await prof.findOne({});
            if (existingProfile) {
                existingProfile.name = name;
                existingProfile.email = email;
                existingProfile.description = description;
                existingProfile.profession = profession;
                existingProfile.work1Title = work1Title;
                existingProfile.work1Description = work1Description;
                existingProfile.work2Title = work2Title;
                existingProfile.work2Description = work2Description;
                existingProfile.work3Title = work3Title;
                existingProfile.work3Description = work3Description;
                existingProfile.work4Title = work4Title;
                existingProfile.work4Description = work4Description;
                existingProfile.images = images;
                await existingProfile.save();
                res.status(200).json({ message: 'Profile updated successfully', profile: existingProfile });
            } else {
                const profileDoc = await prof.create({ name, email, description, profession, work1Title, work1Description, work2Title, work2Description, work3Title, work3Description, work4Title, work4Description, images });
                res.status(200).json({ message: 'Profile created successfully', profile: profileDoc });
            }

        } else if (method === 'GET') {
            if (req.query?.id) {
                const profile = await prof.findById(req.query.id);
                if (profile) {
                    res.status(200).json(profile);
                } else {
                    res.status(404).json({ error: 'Profile not found' });
                }
            } else {
                const profile = await prof.findOne({});
                if (profile) {
                    res.status(200).json(profile);
                } else {
                    res.status(404).json({ error: 'Profile not found' });
                }
            }

        } else if (method === 'PUT') {
            const { _id, name, email, description, profession, work1Title, work1Description, work2Title, work2Description, work3Title, work3Description, work4Title, work4Description, images } = req.body;

            console.log("Received Data:", req.body); // Log incoming data

            if (!_id) {
                return res.status(400).json({ error: 'Profile ID is required for updating' });
            }

            const updatedProfile = await prof.findByIdAndUpdate(
                _id,
                { name, email, description, profession, work1Title, work1Description, work2Title, work2Description, work3Title, work3Description, work4Title, work4Description, images },
                { new: true }
            );

            console.log("Updated Profile:", updatedProfile); // Confirm updated profile document

            if (updatedProfile) {
                res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }

        } else if (method === 'DELETE') {
            if (req.query?.id) {
                const deletedProfile = await prof.findByIdAndDelete(req.query.id);
                if (deletedProfile) {
                    res.status(200).json({ message: 'Profile deleted successfully' });
                } else {
                    res.status(404).json({ error: 'Profile not found' });
                }
            } else {
                res.status(400).json({ error: 'Profile ID is required for deletion' });
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