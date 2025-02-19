import { useState, useEffect } from "react";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";
import { signOut } from "next-auth/react";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "@/components/Spinner";
import { GiClick } from "react-icons/gi";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";

export default function Setting() {
    const { alldata, loading } = useFetchData('/api/prof');

    if (loading) {
      return <Spinner/>; // Data load hone tak ye dikhayega
    }
  
    if (!alldata) {
      return <p>No profile data available</p>; // Agar data empty ya null hai
    }

    return (
        <>
            <div className="settingpage">
                <div className="titledashboard flex flex-sb">
                    <div>
                        <h2>Admin <span>Profile Settings</span></h2>
                    </div>
                    <div className="breadcrumb">
                        <IoSettingsOutline />
                       <span>Profile</span>
                    </div>
                </div>

                <div className="profilesettings">
                    <div className="leftprofile_details flex">
                        {/* <img src="/img/coder.png" alt="coder" /> */}
                        <img src={alldata.images} alt="Profile" />
                        <div className="w-100">
                            <div className="flex flex-sb flex-left mt-2">
                                <h2>My Profile:</h2>
                                <h3>{alldata.name} <br />{alldata.profession}</h3>
                            </div>
                            <div className="flex flex-sb mt-2">
                                <h3>Phone</h3>
                                <input type="text" defaultValue={"92XXXXXX12"} />
                            </div>
                            <div className="mt-2 flex flex-sb">
                                <h3>E-mail</h3>
                                <input type="text" defaultValue={alldata.email} />
                            </div>
                            <div className="flex flex-center w-100 mt-2">
                            <Link href='/prof/addprof'>
                            {/* <Link href='/setting/edit'> */}
                                <button>Update Profile</button>
                                </Link>
                                {/* {console.log(alldata)} */}


                            </div>
                        </div>
                    </div>
                    <div className="rightlogoutsec">
                        <div className="topaccountnbox topaccoutnbox">
                            <h2 className="flex flex-sb"> Add More Details<MdOutlineAccountCircle /> </h2>
                            <h6>click on below option for adding information</h6>
                            <hr />
                            <div className="flex flex-sb mt-1">
                            
                            <Link href='/prof/education'> <h3>Add Education Details <GiClick /></h3>
                           
                            </Link>
                            
                               
                                <button onClick={() => signOut()} className="">Log out</button>
                           
                            </div>
                            <Link href='/prof/sociallink'> <h3>Add Social Links <FaLinkedin /></h3>
                           
                            </Link>
                        </div>
                    </div>
                </div>

            </div>


            <div>
    </div>
        </>
    );
}
