//3:39:00 end to 3:33:00 start

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
import Head from 'next/head'; // Import Head for setting the document head

export default function Photo({
    _id,
    title: existingTitle,
    slug: existingSlug,
    images: existingImages,
}) {
    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState(existingTitle || '');
    const [slug, setSlug] = useState(existingSlug || '');
    const [images, setImages] = useState(existingImages || []);
    const [isUploading, setIsUploading] = useState(false);
    const uploadImageQueue = [];

    async function createBlog(ev) {
        ev.preventDefault();

        if (isUploading) {
            await Promise.all(uploadImageQueue);
        }

        const data = { title, slug, images };

        try {   
            if (_id) {
                await axios.put('/api/photos', { ...data, _id });
                toast.success('Data Updated');
            } else {
                console.log('Data being sent for new blog:', data);
                await axios.post('/api/photos', data);
                toast.success('Project Created');
            }
            router.push('/gallery');
            setRedirect(true);
        } catch (error) {
            console.error('Error creating/updating projects:', error);
            toast.error('Failed to create/update projects');
        }
    }

    async function uploadImages(ev) {
        const files = ev.target?.files;
        if (files.length > 0) {
            setIsUploading(true);

            for (const file of files) {
                const data = new FormData();
                data.append('file', file);

                uploadImageQueue.push(
                    axios.post('/api/upload', data).then(res => {
                        setImages(oldImages => [...oldImages, ...res.data.links]);
                    })
                );
            }

            await Promise.all(uploadImageQueue);
            setIsUploading(false);
            toast.success('Images Uploaded');
        } else {
            toast.error('An error occurred!');
        }
    }

    if (redirect) {
        router.push('/gallery');
        return null;
    }

    function updateImagesOrder(images) {
        setImages(images);
    }

    function handleDeleteImage(index) {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        setImages(updatedImages);
        toast.success('Image deleted successfully');
    }

    const handleSlugChange = (e) => {
        const inputValue = e.target.value;
        const newSlug = inputValue.replace(/\s+/g, '-');
        setSlug(newSlug);
    };

    return (
        <>
            <Head>
                <title>{_id ? 'Edit Photo' : 'Add Photo'}</title>
            </Head>
            <form className='addWebsiteform' onSubmit={createBlog}>
                {/* PHOTO title */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        id='title'
                        placeholder='Enter Small title'
                        value={title}
                        onChange={ev => setTitle(ev.target.value)}
                    />
                </div>

                {/* PHOTO slug url */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <label htmlFor='slug'>Slug (SEO Friendly URL)</label>
                    <input
                        type='text'
                        id='slug'
                        placeholder='Enter Slug URL'
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </div>

                {/* PHOTO images */}
                <div className='w-100 flex flex-col flex-left mb-2'>
                    <div className='w-100'>
                        <label htmlFor='fileInput'>Images (First Image is shown as Thumbnail, you can drag)</label>
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

                {/* Image preview and sortable with delete image */}
                {!isUploading && (
                    <div className='flex'>
                        <ReactSortable list={Array.isArray(images) ? images : []} setList={updateImagesOrder} animation={200} className='flex gap-1'>
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

                <div className='w-100 mb-1'>
                    <button type='submit' className='w-100 addwebbtn flex-center'>SAVE PHOTO</button>
                </div>
            </form>
        </>
    );
}
