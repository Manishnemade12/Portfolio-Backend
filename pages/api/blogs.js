
import Blog from "@/models/Blog"; 
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'POST') {
            const { title, slug, images, description, blogcategory, tags, status } = req.body;

            const blogDoc = await Blog.create({
                title, slug, images, description, blogcategory, tags, status
            });

            res.json(blogDoc);
        } else if (method === 'GET') {
            if (req.query?.id) {
                res.json(await Blog.findById(req.query.id));
            } else {
                res.json((await Blog.find()).reverse());
            }
        } else if (method === 'PUT') {
            const { _id, title, slug, images, description, blogcategory, tags, status } = req.body;

            await Blog.updateOne({ _id }, {
                title, slug, images, description, blogcategory, tags, status
            });
            res.json(true);
        } else if (method === 'DELETE') {
            if (req.query?.id) {
                await Blog.deleteOne({ _id: req.query?.id });
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
    
