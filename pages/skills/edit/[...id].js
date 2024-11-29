
import { useState, useEffect } from "react";
import Skills from "@/components/Skills"
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { GrCloudComputer } from "react-icons/gr";
import toast from "react-hot-toast";

export default function Editskills() {
    const router = useRouter();
    const { id } = router.query;

    const [skillsInfo, setskillsInfo] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        
        axios.get('/api/skills?id=' + id)
            .then(response => {
                setskillsInfo(response.data);
            })
            .catch(error => {
                toast.error("Failed to fetch skills info");
            });
    }, [id]);

    return (
        <>
            <Head>
                <title>Edit Skill</title>
            </Head>

            <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Edit <span>{skillsInfo?.title}</span></h2>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <GrCloudComputer />  <span>/</span> <span>Edit Skill</span>
                    </div>
                </div>
                <div className="mt-3"> {/* Fixed syntax error here */}
                    {skillsInfo && (
                        <Skills {...skillsInfo} />
                        
                    )}
                </div>
            </div>
        </>
    );
}
