import Dataloading from "@/components/Dataloading";
import useFetchData from "@/hooks/useFetchData";
import Link from "next/link";
import { useState } from "react";
import { TbBrandBlogger } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";

export default function skills() {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(7);
    const [searchQuery, setSearchQuery] = useState("");

    // Fetch blog data
    const { alldata, loading } = useFetchData("/api/skills");

    // Pagination logic
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Filter data based on search query
    const filteredBlogs =
        searchQuery.trim() === ""
            ? alldata
            : alldata.filter((blog) =>
                  blog.title.toLowerCase().includes(searchQuery.toLowerCase())
              );

    const indexOfFirstBlog = (currentPage - 1) * perPage;
    const indexOfLastBlog = currentPage * perPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    // Generate page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredBlogs.length / perPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h1>
                        All Published <span>Skills</span>
                    </h1>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <TbBrandBlogger /> <span>/</span> <span>skills</span>
                </div>
            </div>

            <div className="blogstable">
                <div className="flex gap-2 mb-1">
                    <h2>Search Skills:</h2>
                    <input
                        type="text"
                        placeholder="Search skills by title..."
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
                        ) : currentBlogs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center">
                                    No skills found
                                </td>
                            </tr>
                        ) : (
                            currentBlogs.map((blog, index) => (
                                <tr key={blog._id}>
                                    <td>{indexOfFirstBlog + index + 1}</td>
                                    <td>
                                        <img
                                            src={blog.images[0]}
                                            width={180}
                                            alt="blog image"
                                        />
                                    </td>
                                    <td>
                                        <h3>{blog.title}</h3>
                                    </td>
                                    <td>
                                        <div className="flex gap-2 flex-center">
                                            <Link href={"/skills/edit/" + blog._id}>
                                                <button>
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                            <Link href={"/skills/delete/" + blog._id}>
                                                <button>
                                                    <RiDeleteBin6Fill />
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                {currentBlogs.length > 0 && (
                    <div className="blogpagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        {pageNumbers
                            .slice(
                                Math.max(currentPage - 3, 0),
                                Math.min(currentPage + 2, pageNumbers.length)
                            )
                            .map((number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={currentPage === number ? "active" : ""}
                                >
                                    {number}
                                </button>
                            ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentBlogs.length < perPage}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
