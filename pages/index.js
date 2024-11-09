import Head from "next/head";
import { Bar } from 'react-chartjs-2';
import Loading from "@/components/Loading"; // Ensure this component exists
import { IoHome } from "react-icons/io5";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import LoginLayout from "@/components/LoginLayout";

export default function Home() {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const [blogsData, setBlogsData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [shopData, setShopData] = useState([]);
  const [photosData, setPhotosData] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    title: {
      display: true,
      text: 'Blogs Created Monthly By Year',
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseBlogs = await fetch('/api/blogs');
        const responseProjects = await fetch('/api/projects');
        const responseShops = await fetch('/api/shops');
        const responsePhotos = await fetch('/api/photos');

        if (!responseBlogs.ok || !responseProjects.ok || !responseShops.ok || !responsePhotos.ok) {
          throw new Error('Failed to fetch one or more resources');
        }

        const dataBlogs = await responseBlogs.json();
        const dataProjects = await responseProjects.json();
        const dataShops = await responseShops.json();
        const dataPhotos = await responsePhotos.json();

        setBlogsData(dataBlogs);
        setProjectData(dataProjects);
        setShopData(dataShops);
        setPhotosData(dataPhotos);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const monthlyData = blogsData.filter(dat => dat.status === "publish").reduce((acc, blog) => {
    const year = new Date(blog.createdAt).getFullYear();
    const month = new Date(blog.createdAt).getMonth();
    acc[year] = acc[year] || Array(12).fill(0);
    acc[year][month]++;
    return acc;
  }, {});

  const currentYear = new Date().getFullYear();
  const years = Object.keys(monthlyData);
  const labels = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  const datasets = years.map(year => ({
    label: `${year}`,
    data: monthlyData[year] || Array(12).fill(0),
    backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`
  }));

  const data = { 
    labels,
    datasets
  };

  return (
    <LoginLayout>
    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="dashboard">
        <div className="titledashboard flex flex-sb">
          <div>
            <h2>Admin <span>Dashboard</span></h2>
            <h3>ADMIN PANEL</h3>
          </div>
          <div className="breadcrumb">
            <IoHome />  <span>/</span> <span>Dashboard.</span>
          </div>
        </div>

        <div className="topfourcards flex flex-sb">
          <div className="four_card">
            <h2>Total Blogs</h2>
            <span>{blogsData.filter(dat => dat.status === 'publish').length}</span>
          </div>
          <div className="four_card">
            <h2>Total Projects</h2>
            <span>{projectData.filter(dat => dat.status === 'publish').length}</span>
          </div>
          <div className="four_card">
            <h2>Total Products</h2>
            <span>{shopData.filter(dat => dat.status === 'publish').length}</span>
          </div>
          <div className="four_card">
            <h2>Gallery Photos</h2>
            <span>{photosData.length}</span>
          </div>
        </div>

        <div className="year_overview flex flex-sb">
          <div className="leftyearoverview">
            <div className="flex flex-sb">
              <h3>Year Overview</h3>
              <ul className="creative-dots">
                <li className="big-dot">  </li>
                <li className="semi-blog-dot">  </li>
                <li className="medium-dot">  </li>
                <li className="semi-medium-dot">  </li>
                <li className="semi-small-dot">  </li>
                <li className="small-dot">  </li>
              </ul>
              <h3 className="text-right">
                {blogsData.filter(dat => dat.status === 'publish').length} / 365 <br />
                <span>Total Published</span>
              </h3>
            </div>

            {loading ? (
              <Loading />
            ) : (
              <Bar data={data} options={options} />
            )}
          </div>

          <div className="right_selescont ">
            <div className="leftyearoverview manish">
              <div>
                <h3>Blogs By Category</h3>
                <ul className="creative-dots">
                  <li className="big-dot">  </li>
                  <li className="semi-blog-dot">  </li>
                  <li className="medium-dot">  </li>
                  <li className="semi-medium-dot">  </li>
                  <li className="semi-small-dot">  </li>
                  <li className="small-dot">  </li>
                </ul>
              </div>
              <div className="blogscategory flex flex-center">
                <table>
                  <thead>
                    <tr>
                      <td>Topics</td>
                      <td>Data</td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Kubernetes</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Kubernetes").length}</td>
                    </tr>
                    <tr>
                      <td>Full Stack</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Full Stack").length}</td>
                    </tr>
                    <tr>
                      <td>Frontend</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Frontend").length}</td>
                    </tr>
                    <tr>
                      <td>Backend</td>
                      <td>{blogsData.filter(dat => dat.blogcategory[0] === "Backend").length}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    </LoginLayout>
  );
}
