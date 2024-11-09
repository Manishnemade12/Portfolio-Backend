import { mongooseConnect } from "@/lib/mongoose";
import Contact from "@/models/contact";

export default async function handle(req, res) {
    await mongooseConnect();

    const { method } = req;

    try {
        if (method === 'POST') {
            const {   name,lname, company,  phone, country, price, description, project } = req.body;

            const blogDoc = await Contact.create({
                name,lname, company,  phone, country, price, description, project
            });

            res.json(blogDoc);
        } else if (method === 'GET') {
            if (req.query?.id) {
                res.json(await Contact.findById(req.query.id));
            } else {
                res.json((await Contact.find()).reverse());
            }
        } else if (method === 'PUT') {
            const { _id,   name,lname, company,  phone, country, price, description, project } = req.body;

            await Contact.updateOne({ _id }, {
                name,lname, company,  phone, country, price, description, project
            });
            res.json(true);
        } else if (method === 'DELETE') {
            if (req.query?.id) {
                await Contact.deleteOne({ _id: req.query?.id });
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

