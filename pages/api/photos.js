import { mongooseConnect } from "@/lib/mongoose";
import Photos from "@/models/Photo";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'POST') {
            const { title, slug, images } = req.body;

            // Corrected: Change Project to Photos
            const photoDoc = await Photos.create({
                title, slug, images
            });

            res.json(photoDoc);
        } else if (method === 'GET') {
            if (req.query?.id) {
                res.json(await Photos.findById(req.query.id));
            } else {
                res.json((await Photos.find()).reverse());
            }
        } else if (method === 'PUT') {
            const { _id, title, slug, images } = req.body;

            await Photos.updateOne({ _id }, {
                title, slug, images
            });
            res.json(true);
        } else if (method === 'DELETE') {
            if (req.query?.id) {
                await Photos.deleteOne({ _id: req.query?.id }); // Corrected: Change Project to Photos
                res.json(true);
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
