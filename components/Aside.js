
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { BsPostcard } from "react-icons/bs";
import { MdWorkOutline, MdOutlineContacts } from "react-icons/md";
import { LuShoppingCart } from "react-icons/lu";
import { RiGalleryLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/LoginLayout";
import { useSession, signOut  } from "next-auth/react";

export default function Aside({ HandleAsideOpen, asideOpen }) {
    const router = useRouter();
    const [activeLink, setActiveLink] = useState('/');

    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname]);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
 const { data: session } = useSession();
 if (session) {
    
 
    return (
        <LoginLayout>
            <aside className={asideOpen ? 'asideleft active' : 'asideleft'}>
                <ul>
                    <Link href='/'>
                        <li className={activeLink === '/' ? 'navactive' : ''}>
                            <IoHome />
                            <span>Dashboard</span>
                        </li>
                    </Link>
                    <li className={activeLink === '/blogs' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/blogs')}>
                        <div className="flex gap-1">
                            <BsPostcard />
                            <span>Blogs</span>
                        </div>
                        {activeLink === '/blogs' && (
                            <ul>
                                <Link href='/blogs'><li>All Blogs</li></Link>
                                <Link href='/blogs/draft'><li>Draft Blogs</li></Link>
                                <Link href='/blogs/addblog'><li>Add Blogs</li></Link>
                            </ul>
                        )}
                    </li>
                    <li className={activeLink === '/projects' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/projects')}>
                        <div className="flex gap-1">
                            <MdWorkOutline />
                            <span>Projects</span>
                        </div>
                        {activeLink === '/projects' && (
                            <ul>
                                <Link href='/projects'><li>All Projects</li></Link>
                                <Link href='/projects/draftprojects'><li>Draft Projects</li></Link>
                                <Link href='/projects/addproject'><li>Add Projects</li></Link>
                            </ul>
                        )}
                    </li>
                    <li className={activeLink === '/shops' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/shops')}>
                        <div className="flex gap-1">
                            <LuShoppingCart />
                            <span>Shops</span>
                        </div>
                        {activeLink === '/shops' && (
                            <ul>
                                <Link href='/shops'><li>All Products</li></Link>
                                <Link href='/shops/addproduct'><li>Add Products</li></Link>
                                <Link href='/shops/draftshops'><li>Draft Products</li></Link>
                            </ul>
                        )}
                    </li>
                    <li className={activeLink === '/gallery' ? 'navactive flex-col flex-left' : 'flex-col flex-left'} onClick={() => handleLinkClick('/gallery')}>
                        <div className="flex gap-1">
                            <RiGalleryLine />
                            <span>Gallery</span>
                        </div>
                        {activeLink === '/gallery' && (
                            <ul>
                                <Link href='/gallery'><li>All Photos</li></Link>
                                <Link href='/gallery/addphoto'><li>Add Photo</li></Link>
                            </ul>
                        )}
                    </li>
                    <Link href='/contacts'>
                        <li className={activeLink === '/contacts' ? 'navactive' : ''}>
                            <MdOutlineContacts />
                            <span>Contacts</span>
                        </li>
                    </Link>
                    <Link href='/prof'>
                        <li className={activeLink === '/prof' ? 'navactive' : ''}>
                        <CgProfile />
                            <span>Profile</span>
                        </li>
                    </Link>

                </ul>
                <button onClick={() => signOut()} className="logoutbtn">Logout</button>
            </aside>
        </LoginLayout>
    );
}}
