import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';

export default function Education() {
    const [profile, setProfile] = useState({
        education: [{ school: '', educationDescription: '', year: '' }, { school: '', educationDescription: '', year: '' }, { school: '', educationDescription: '', year: '' }, { school: '', educationDescription: '', year: '' }]
    });
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/education');
                if (response.data) {
                    setProfile(response.data);
                    setIsEditing(true);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiMethod = isEditing ? 'put' : 'post';
            const apiEndpoint = '/api/education';
            const response = await axios[apiMethod](apiEndpoint, profile);

            if (response.status === 200 || response.status === 201) {
                toast.success(`Profile ${isEditing ? 'updated' : 'created'} successfully!`);
                router.push('/prof');
            } else {
                toast.error('Failed to save profile. Please try again.');
            }
        } catch (error) {
            console.error('Error saving profile:', error);
            toast.error('An error occurred. Please try again.');
        }
    };

    const handleInputChange = (field, index, value) => {
        const updatedEducation = [...profile.education];
        updatedEducation[index][field] = value;
        setProfile({ ...profile, education: updatedEducation });
    };

    return (
        <>
            <Head>
                <title>{isEditing ? 'Edit Education Details' : 'Create Education Details'}</title>
            </Head>
            <div className="justifycenter">
                <form onSubmit={handleSubmit} className="education-form">
                    <h1>Education Details </h1>

                    {profile.education.map((edu, index) => (
                        <div key={index} className="education-entry">
                            <div className="input-group">
                                <label>{`School - ${index + 1}`}</label>
                                <input
                                    type="text"
                                    value={edu.school}
                                    onChange={(e) => handleInputChange('school', index, e.target.value)}
                                // required
                                />
                            </div>
                            <div className="input-group">
                                <label>Education Description</label>
                                <textarea
                                    value={edu.educationDescription}
                                    onChange={(e) => handleInputChange('educationDescription', index, e.target.value)}
                                />
                            </div>
                            <div className="input-group">
                                <label>Year</label>
                                <input
                                    type="text"
                                    value={edu.year}
                                    onChange={(e) => handleInputChange('year', index, e.target.value)}
                                />
                            </div>
                        </div>
                    ))}

                    <div className="save-profile">
                        <button type="submit">{isEditing ? 'Update Details' : 'Save Details'}</button>
                    </div>
                </form>
            </div>
        </>
    );
}
