

// import { mongooseConnect } from "@/lib/mongoose";
// import { Profile } from "@/models/Profile";

// export default async function handler(req, res) {
//     await mongooseConnect();

//     const { email, password } = req.body;
    

//     try {
//         // Check if the user exists
//         const existingUser = await Profile.findOne({ email });

//         if (existingUser) {
//             return res.status(400).json({ error: 'user already exist' });

//         } else {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const newuser
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }
import { mongooseConnect } from "@/lib/mongoose";
import { Profile } from "@/models/Profile";

export default async function handler(req, res) {
    await mongooseConnect();

    const { email, password } = req.body;

 
    try {
        // Check if the user already exists
        const existingUser = await Profile.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }


        const newUser = await Profile.create({ email,password });

        return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
