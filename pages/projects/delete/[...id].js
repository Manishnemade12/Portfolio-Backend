import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsPostcard } from "react-icons/bs";


export default function DeleteProduct() {
    const router = useRouter();
    const { id } = router.query;

    const [productInfo, setProductInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        axios.get('/api/projects?id=' + id)
            .then(response => {
                setProductInfo(response.data);
            })
            .catch(error => {
                toast.error("Failed to fetch product info");
            });
    }, [id]);

    function goBack() {
        router.push('/projects');
    }

    async function deleteShop() {
        try {
            await axios.delete('/api/projects?id=' + id);
            toast.success('Delete successful');
            goBack();
        } catch (error) {
            toast.error("Delete failed");
        }
    }

    return (
        <>
            <Head>
                <title>Delete project</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Delete <span>{productInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <BsPostcard /> <span>/</span> <span>Delete project</span>
                    </div>
                </div>
                <div className="deletesec flex flex-center wh_100">
                    <div className="deletecard">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="red"
                            strokeWidth="2"
                            height="6em"
                            width="6em"
                        >
                            <path d="M3 6h18M8 6v12h8V6H8z" />
                            <path d="M7 6V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 20h10a2 2 0 0 0 2-2V8H5v10a2 2 0 0 0 2 2z" />
                            <path d="M9 11h1v5H9zm5 0h1v5h-1z" />
                        </svg>

                      
                            <p className="cookieHeading">Are you sure ?</p>
                            <p className="cookieDescription">if you delete it, the data deleted Permenantly</p>
                           <div className="buttonContainer">
                           <button onClick={deleteShop} className="acceptButton">Delete</button>
                           <button onClick={goBack} className="declineButton">Cancel</button>
                           </div>
                        
                    </div>
                </div>
            </div>
        </>
    );
}
