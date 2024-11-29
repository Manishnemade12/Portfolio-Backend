import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteForever } from "react-icons/md";
import Spinner from '@/components/Spinner';

export default function AddProfile() {
    const [profile, setProfile] = useState({
        name: '', email: '', description: '', profession: '',
        work1Title: '', work1Description: '', work2Title: '', work2Description: '',
        work3Title: '', work3Description: '', work4Title: '', work4Description: '',
        images: []
    });
    const [isEditing, setIsEditing] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const uploadImageQueue = [];
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/prof');
                if (response.data) {
                    setProfile(response.data);
                    setIsEditing(true);  // Flag to determine PUT or POST
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (isUploading) {
            await Promise.all(uploadImageQueue);
        }

        const data = { ...profile };
        const apiMethod = isEditing ? 'put' : 'post'; // Use PUT if editing, POST if creating

        try {
            await axios[apiMethod]('/api/prof', data);
            toast.success('Profile saved successfully');
            router.push('/prof');
        } catch (error) {
            toast.error('Failed to save profile');
        }
    };

    const uploadImages = async (ev) => {
        const files = ev.target.files;
        if (files.length > 0) {
            setIsUploading(true);
            for (const file of files) {
                const formData = new FormData();
                formData.append('file', file);

                uploadImageQueue.push(
                    axios.post('/api/upload', formData).then(res => {
                        setProfile(oldProfile => ({
                            ...oldProfile,
                            images: [...res.data.links]
                        }));
                    })
                );
            }
            await Promise.all(uploadImageQueue);
            setIsUploading(false);
            toast.success('Images Uploaded');
        } else {
            toast.error('An error occurred!');
        }
    };

    const updateImagesOrder = (images) => {
        setProfile({ ...profile, images });
    };

    const handleDeleteImage = (index) => {
        const updatedImages = [...profile.images];
        updatedImages.splice(index, 1);
        setProfile({ ...profile, images: updatedImages });
        toast.success('Image deleted successfully');
    };

    return (
        <>
            <Head>
                <title>{isEditing ? 'Edit Profile' : 'Create Profile'}</title>
            </Head>

            <div className='justifycenter'>
                <div className='profiledetailsimage'>
                    <h1>Update Profile Details <img src={profile.images} /> </h1>

                </div>

                <form onSubmit={handleSubmit} className="Profilegpage1">
                    {/* Basic Profile Fields */}

                    <div className="profileSet">
                        <label>Name</label>
                        <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className="profileSet">
                        <label>Email</label>
                        <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="profile_details">
                        <label>Description</label>
                        <textarea
                            value={profile.description}
                            onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                        />
                    </div>


                    <div className="profileSet">
                        <label>Profession</label>
                        <input
                            type="text"
                            value={profile.profession}
                            onChange={(e) => setProfile({ ...profile, profession: e.target.value })}
                            required
                        />
                    </div>

                    {/* Additional Profile Fields */}
                    {/* Image Upload Section */}
                    <div className='w-100 flex flex-col flex-left mb-2'>
                        <label htmlFor='fileInput' className='label-color'><h3>Image for Profile Photo, used in multiple location on Personal Portal</h3></label>
                        <input
                            type='file'
                            id='fileInput'
                            className='mt-1'
                            accept='image/*'
                            multiple
                            onChange={uploadImages}
                        />
                    </div>
                    <div className='w-100 flex flex-left mt-1'>
                        {isUploading && (<Spinner />)}
                    </div>

                    {/* Image Preview and Sortable with Delete Option */}
                    {!isUploading && (
                        <div className='flex gap-m'>
                            <ReactSortable list={Array.isArray(profile.images) ? profile.images : []} setList={updateImagesOrder} animation={200} className='flex gap-1'>
                                {profile.images?.map((link, index) => (
                                    <div key={link} className='uploadedimg'>
                                        <div className='ERROR-container'>
                                            <img src={link} alt='image' className='ERROR' />
                                            <div className='fire-effect'></div>
                                        </div>
                                        <div className='deleteimg'>
                                            <button onClick={() => handleDeleteImage(index)}><MdDeleteForever /></button>
                                        </div>
                                    </div>


                                ))}
                            </ReactSortable>
                        </div>
                    )}

                    <div>
                        <h1> Technical Stack Qualities</h1>
                    </div>

                    <div className="profileSet">
                        <label>Technical Stack title -1</label>
                        <input
                            type="text"
                            value={profile.work1Title}
                            onChange={(e) => setProfile({ ...profile, work1Title: e.target.value })}
                            required
                        />
                    </div>


                    <div className="profile_details">
                        <label>Technical Stack Description</label>
                        <textarea
                            value={profile.work1Description}
                            onChange={(e) => setProfile({ ...profile, work1Description: e.target.value })}
                        />
                    </div>

                    <div className="profileSet">
                        <label>Technical Stack title -2</label>
                        <input
                            type="text"
                            value={profile.work2Title}
                            onChange={(e) => setProfile({ ...profile, work2Title: e.target.value })}
                            required
                        />
                    </div>


                    <div className="profile_details">
                        <label>Technical Stack Description</label>
                        <textarea
                            value={profile.work2Description}
                            onChange={(e) => setProfile({ ...profile, work2Description: e.target.value })}
                        />
                    </div>

                    <div className="profileSet">
                        <label>Technical Stack title -3</label>
                        <input
                            type="text"
                            value={profile.work3Title}
                            onChange={(e) => setProfile({ ...profile, work3Title: e.target.value })}
                            required
                        />
                    </div>


                    <div className="profile_details">
                        <label>Technical Stack Description</label>
                        <textarea
                            value={profile.work3Description}
                            onChange={(e) => setProfile({ ...profile, work3Description: e.target.value })}
                        />
                    </div>

                    <div className="profileSet">
                        <label>Technical Stack title -4</label>
                        <input
                            type="text"
                            value={profile.work4Title}
                            onChange={(e) => setProfile({ ...profile, work4Title: e.target.value })}
                            required
                        />
                    </div>


                    <div className="profile_details">
                        <label>Technical Stack Description</label>
                        <textarea
                            value={profile.work4Description}
                            onChange={(e) => setProfile({ ...profile, work4Description: e.target.value })}
                        />
                    </div>

                        {/* <div className='one-line'> */}
                    {/* <div className="save-profile"> */}
                        {/* <button type="submit">Go Back</button>
                        </div> */}
                        <div className='righhcontsbtn'>
                        <button type="submit">Save Profile</button>
                        </div>
                        {/* </div>    */}
                    
                </form>
            </div>
        </>
    );
}