import { mongooseConnect } from '@/lib/mongoose';
import Education from '@/models/education';

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'POST') {
            const { education } = req.body;

            const profileDoc = await Education.create({ education });
            res.status(200).json({ message: 'Profile created successfully', profile: profileDoc });

        } else if (method === 'GET') {
            const profile = await Education.findOne({});
            if (profile) {
                res.status(200).json(profile);
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }

        } else if (method === 'PUT') {
            const { _id,education } = req.body;

            if (!_id) {
                return res.status(400).json({ error: 'Profile ID is required for updating' });
            }

            const updatedProfile = await Education.findByIdAndUpdate(
                _id,
                { education },
                { new: true }
            );

            if (updatedProfile) {
                res.status(200).json({ message: 'Profile updated successfully', profile: updatedProfile });
            } else {
                res.status(404).json({ error: 'Profile not found' });
            }

        } else {
            res.setHeader('Allow', ['POST', 'GET', 'PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
