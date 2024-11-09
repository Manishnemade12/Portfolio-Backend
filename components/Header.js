    // import { RiBarChartHorizontalFill } from "react-icons/ri";
    // import { BiExitFullscreen } from "react-icons/bi";
    // import { GoScreenFull } from "react-icons/go";
    // import { useState } from "react";
    // import LoginLayout from "@/components/LoginLayout";

    // export default function Header({ HandleAsideOpen }) {

    //     const [isFullScreen, setIsFullScreen] = useState(false);
    //     const toggleFullScreen = () => {
    //         if (!document.fullscreenElement) {
    //             document.documentElement.requestFullscreen().then(() => {
    //                 setIsFullScreen(true);
    //             })
    //         }
    //         else {
    //             document.exitFullscreen().then(() => {
    //                 setIsFullScreen(false);
    //             })
    //         }
    //     }
    
    //     return <>
    // {/* <LoginLayout> */}
    //         <header className="header flex flex-sb">
    //             <div className="logo flex gap-2">
    //                 <h1>  ADMIN </h1>
    //                 <div className="headerham flex flex-center" onClick={HandleAsideOpen}>
    //                     <RiBarChartHorizontalFill />
    //                 </div>

    //             </div>

    //             <div className="rightnav flex gap-2">
    //                 <div onClick={toggleFullScreen}>
    //                     {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}

    //                 </div>

    //                 <div className="notification">
    //                     <img src="/img/notification.png" alt="notification" />
    //                 </div>


    //                 <div className="profilenav">
    //                     <img src="/img/user.png" alt="user" />
    //                 </div>
    //             </div>

    //         </header>
    //         {/* </LoginLayout> */}
    //     </>
    // }
    import { RiBarChartHorizontalFill } from "react-icons/ri";
    import { BiExitFullscreen } from "react-icons/bi";
    import { GoScreenFull } from "react-icons/go";
    import { useState } from "react";
    import LoginLayout from "@/components/LoginLayout";
import { useSession } from "next-auth/react";
    
    export default function Header({ HandleAsideOpen }) {
        const [isFullScreen, setIsFullScreen] = useState(false);
    
        const toggleFullScreen = () => {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().then(() => {
                    setIsFullScreen(true);
                });
            } else {
                document.exitFullscreen().then(() => {
                    setIsFullScreen(false);
                });
            }
        };
        const { data: session } = useSession();
        // if (session) {
        return (
            <LoginLayout>
                <header className="header flex flex-sb">
                    <div className="logo flex gap-2">
                        <h1>ADMIN</h1>
                     
                          {session ?    <div className="headerham flex flex-center" onClick={HandleAsideOpen}>
                          
                          <RiBarChartHorizontalFill /> 
                        </div>: null} 


                    </div>
    
                    <div className="rightnav flex gap-2">
                        <div onClick={toggleFullScreen}>
                            {isFullScreen ? <BiExitFullscreen /> : <GoScreenFull />}
                        </div>
    
                        <div className="notification">
                            <img src="/img/notification.png" alt="notification" />
                        </div>
    
                        <div className="profilenav">
                            <img src="/img/user.png" alt="user" />
                        </div>
                    </div>
                </header>
            </LoginLayout>
        );
    }
