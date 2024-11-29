// pages/api/skills.js
import { mongooseConnect } from "@/lib/mongoose";
import Skills from "@/models/Skills";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'POST') {
            const { title, images, description } = req.body;

            const SkillsDoc = await Skills.create({
                title, images,description
            });

            res.json(SkillsDoc);
        } else if (method === 'GET') {
            if (req.query?.id) {
                res.json(await Skills.findById(req.query.id));
            } else {
                res.json((await Skills.find()).reverse());
            }
        } else if (method === 'PUT') {
            const { _id, title, images, description } = req.body;

            await Skills.updateOne({ _id }, {
                title, images, description
            });
            res.json(true);
        } else if (method === 'DELETE') {
            if (req.query?.id) {
                await Skills.deleteOne({ _id: req.query?.id });
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
