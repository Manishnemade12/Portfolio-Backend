import Blog from "@/components/Blog";
import { TbBrandBlogger } from "react-icons/tb";

export default function Addblog() {



    return <>
        <div className="addblogspage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Add<span>Blog</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">

                    <TbBrandBlogger /> <span>/</span>  <span>AddBlog</span>
                </div>
            </div>

            <div className="blogsadd">

                <Blog />
            </div>
        </div>
    </>
}