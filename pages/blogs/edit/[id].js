
import { useState, useEffect } from "react"; // Import useState and useEffect
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { TbBrandBlogger } from "react-icons/tb"; // Ensure to import TbBrandBlogger
import toast from "react-hot-toast";
import Blog from "@/components/Blog";



export default function EditBlog() {
  const router = useRouter();
  const { id } = router.query;

  const [productInfo, setProductInfo] = useState(null);

  useEffect(() => {
      if (!id) {
          return;
      }
      
      axios.get('/api/blogs?id=' + id)
          .then(response => {
              setProductInfo(response.data);
          })
          .catch(error => {
              toast.error("Failed to fetch product info");
          });
  }, [id]);

  return (
    <>
        <Head>
            <title>Edit Blog</title>
        </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{productInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <TbBrandBlogger /> <span>/</span> <span>Edit Blog</span>
                </div>
            </div>
            <div className="mt-3"> 
                {productInfo && (
                    <Blog {...productInfo} />
                )}
            </div>
        </div>
    </>
);
}
