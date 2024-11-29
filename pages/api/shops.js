// pages/api/shops.js
import { mongooseConnect } from "@/lib/mongoose";
import Product from "@/models/Shop";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'POST') {
            const { title, slug, images, description, afilink, tags, price, status } = req.body;

            const productDoc = await Product.create({
                title, slug, images, description, afilink, tags, price, status
            });

            res.json(productDoc);
        } else if (method === 'GET') {
            if (req.query?.id) {
                res.json(await Product.findById(req.query.id));
            } else {
                res.json((await Product.find()).reverse());
            }
        } else if (method === 'PUT') {
            const { _id, title, slug, images, description, afilink, tags, price, status } = req.body;

            await Product.updateOne({ _id }, {
                title, slug, images, description, afilink, tags, price, status
            });
            res.json(true);
        } else if (method === 'DELETE') {
            if (req.query?.id) {
                await Product.deleteOne({ _id: req.query?.id });
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
