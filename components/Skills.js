import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ReactSortable } from 'react-sortablejs';
import { MdDeleteForever } from "react-icons/md";
import Head from "next/head";

export default function Skills(
    {
        _id,
        title: existingTitle,
        description: existingDescription,
        images: existingImages,

    }
) {

    const [redirect, setRedirect] = useState(false);

    const router = useRouter()


    const [title, setTitle] = useState(existingTitle || '');
    const [description, setdescription] = useState(existingDescription || '');
    const [images, setImages] = useState(existingImages || []);


    // for image uploading 
    const [isUploading, setIsUploading] = useState(false);
    const uploadImageQueue = [];



    async function createBlog(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImageQueue)
        }

        const data = {  title, images, description };

        try {
            if (_id) {
                await axios.put('/api/skills', { ...data, _id });
                toast.success('Data Updated');

            } else {
                console.log('Data being sent for new skills:', data); // Log the data being sent
                await axios.post('/api/skills', data);
                toast.success('skills Created');

            }
            router.push('/skills')

            setRedirect(true);
        } catch (error) {
            console.error('Error creating/updating skils:', error); // Log the error
            toast.error('Failed to create/update skils'); // Notify user of failure
        }
    };

    async function uploadImages(ev) {
        const files = ev.target?.files
        if (files.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                uploadImageQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setImages(oldImages => [...oldImages, ...res.data.links])
                    })
                )
            }

            // wait for all images to finish uploading

            await Promise.all(uploadImageQueue);


            setIsUploading(false);
            toast.success('images Uploaded')
        } else {
            toast.error('An error Occured!')
        }
    }

    if (redirect) {
        router.push('/skills');
        return null;
    }


    function updateImagesOrder(images) {
        if (images.length > 1) {
            toast.error('You can upload only one image!');
            return;
        }
        setImages(images);
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('images deleted successfully');
    }



    return <>
        <Head>
            <title>Add skills</title>
        </Head>

        <form className='addWebsiteform' onSubmit={createBlog}>
            {/* blog title */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='title'>Skill Title</label>
                <input
                    type='text'
                    id='title'
                    placeholder='Enter Small title'
                    value={title}
                    onChange={ev => setTitle(ev.target.value)}
                />
            </div>


            {/* blog images */}
            <div className='w-100 flex flex-col flex-left mb-2'>
                <div className='w-100'>
                    <label htmlFor='fileInput'>Only one Image get upload</label>
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
            </div>

            {/* image preview and image sortable with delete image */}

            {!isUploading && (
                <div className='flex'>
                    <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200}
                        className='flex gap-1' >

                        {images?.map((link, index) => (
                            <div key={link} className='uploadedimg'>
                                <img src={link} alt='image' className='object-cover' />
                                <div className='deleteimg'>
                                    <button onClick={() => handleDeleteImage(index)}><MdDeleteForever /></button>
                                </div>
                            </div>
                        ))}


                    </ReactSortable>
                </div>
            )}



            {/* markdown Description */}
            <div className='description w-100 flex flex-col flex-left mb-2'>
                <label htmlFor='description'>Skill Efficiency </label>
                <MarkdownEditor
                    value={description}
                    onChange={(ev) => setdescription(ev.text)}

                    style={{ width: '100%', height: '400px' }}

                    renderHTML={(text) => (
                        <ReactMarkdown components={{
                            code: ({ node, inline, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');

                                if (inline) {
                                    return <code {...props}>{children}</code>;
                                } else if (match) {
                                    return (
                                        <div style={{ position: 'relative' }}>
                                            <pre style={{ padding: '0', borderRadius: '5px', overflowX: 'auto', whiteSpace: 'pre-wrap' }} {...props}>
                                                <code>{children}</code>
                                            </pre>
                                            <button style={{ position: 'absolute', top: '0', right: '0', zIndex: '1' }} onClick={() => navigator.clipboard.writeText(children)}>
                                                Copy code
                                            </button>
                                        </div>
                                    );
                                }
                                return <code {...props}>{children}</code>;
                            }
                        }}>
                            {text}
                        </ReactMarkdown>
                    )}
                />
            </div>

            <div className='w-100 mb-1'>
                <button type='submit' className='w-100 addwebbtn flex-center'>SAVE SKILL</button>
            </div>
        </form>
    </>
}

