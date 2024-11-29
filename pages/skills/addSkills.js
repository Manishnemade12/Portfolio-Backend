import Skills from "@/components/Skills";
import { GrCloudComputer } from "react-icons/gr";


export default function AddSkills() {

    return <>
         <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add <span>Skills</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">

                <GrCloudComputer /><span>/</span>  <span>Add Skills</span>
                </div>
            </div>

            <div className="blogsadd">

                <Skills />
            </div>
        </div>
    </>
}