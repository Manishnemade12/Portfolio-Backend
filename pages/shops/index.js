import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { TbBrandBlogger } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";


export default function shops() {
    const [currentPage, setCurrentPage] = useState(1); // Corrected the typo here
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState(''); // Corrected the typo here

    // Fetch blog data
    const { alldata, loading } = useFetchData('/api/shops');

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const allBlogsCount = alldata.length;

    // Filter all data based on search query
    const filteredBlogs = searchQuery.trim() === ''
        ? alldata
        : alldata.filter(blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;

    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const publishedBlogs = currentBlogs.filter(blog => blog.status === 'publish');

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBlogs.length / perPage); i++) {
        pageNumbers.push(i);
    }



    return <>
  <div className="blogpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h1>All Published <span>Products</span></h1>
                        <h3>ADMIN PANEL</h3>
                    </div>
                    <div className="breadcrumb">
                        <TbBrandBlogger /> <span>/</span> <span>Products</span>
                    </div>
                </div>

                <div className="blogstable">
                    <div className="flex gap-2 mb-1">
                        <h2>Search Products :</h2>
                        <input
                            type="text"
                            placeholder="Search By Title..."
                            value={searchQuery}
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
                                    <td colSpan={4} className="text-center">
                                        <Dataloading />
                                    </td>
                                </tr>
                            ) : (
                                publishedBlogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center">No Projects found</td>
                                    </tr>
                                ) : (
                                    publishedBlogs.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{indexOfFirstBlog + index + 1}</td>
                                            <td><img src={blog.images[0]} width={180} alt="image" /></td>
                                            <td><h3>{blog.title}</h3></td>
                                            <td>
                                                <div className="flex gap-2 flex-center">
                                                    <Link href={'/shops/edit/' + blog._id}>
                                                        <button><FaEdit /></button>
                                                    </Link>
                                                    <Link href={'/shops/delete/' + blog._id}>
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

                    {/* Pagination Controls */}
              
               {/* Pagination Controls */}
               {publishedBlogs.length === 0 ? ( " ") : (
                        <div className="blogpagination">
                                      <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>previous</button>
                         {pageNumbers.slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, pageNumbers.length)).map(number => {
                            <button key={number}
                            onClick={() => paginate(number)}
                            className={`${currentPage === number ? 'active' : ''}`}
                            >
                                {number}
                            </button>
                         })}
                         <button onClick={() => paginate(currentPage + 1)} disabled={currentBlogs.length < perPage}>Next</button>
                        </div>
               )}

                </div>
            </div>
    </>
} 