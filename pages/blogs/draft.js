import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { TbBrandBlogger } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";


export default function Draft() {
    const [curretPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQyery, setSearchQuery] = useState('');

    // Fetch blog data
    const { alldata, loading } = useFetchData('/api/blogs');

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allblog = alldata.length;

    // Filter all data based on search query
    const filteredBlogs = searchQyery.trim() === '' 
        ? alldata 
        : alldata.filter(blog => blog.title.toLowerCase().includes(searchQyery.toLowerCase()));

    const indexOfFirstBlog = (curretPage - 1) * perPage;
    const indexOfLastblog = curretPage * perPage;
    
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastblog);
    const publishedblogs = currentBlogs.filter(ab => ab.status === 'draft');

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allblog / perPage); i++) {
        pageNumbers.push(i);
    }

    return <>
       
       <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h1>All Draft <span>Blogs</span></h1>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <TbBrandBlogger /> <span>/</span> <span>Blogs</span>
                    </div>
                </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-1">
                        <h2>Search Blogs :</h2>
                        <input 
                            type="text" 
                            placeholder="Search By Title..." 
                            value={searchQyery}
                            onChange={(e) => setSearchQuery(e.target.value)} 
                        />
                    </div>

                    <table className="table rtable-styling">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td>
                                        <Dataloading />
                                    </td>
                                </tr>
                            ) : (
                                publishedblogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Blogs found</td>
                                    </tr>
                                ) : (
                                    publishedblogs.map((blog, index) => (
                                        <tr key={blog._id}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td><img src={blog.images[0]} width={180} alt="image" /></td>
                                        <td><h3>{blog.title}</h3></td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={'/blogs/edit/' + blog._id}>
                                                    <button><FaEdit /></button>
                                                </Link>
                                                <Link href={'/blogs/delete/' + blog._id}>
                                                    <button><RiDeleteBin6Fill /></button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    ))
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>


    </>
}

