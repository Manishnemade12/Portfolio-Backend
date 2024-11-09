
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <div className="full-h flex flex-center">
                <div className="loading-bar">Loading</div>
            </div>
        );
    }

    // Agar signup page hai, toh bina check kiye children render karo
    if (router.pathname === '/auth/signup') {
        return <>{children}</>;
    }

    // Agar session nahi hai aur kisi protected route par hai, toh signin page par redirect karo
    if (!session && router.pathname !== '/auth/signin') {
        router.push('/auth/signin');
        return null;
    }

    // Agar user authenticated hai aur signin page par hai, toh home page par redirect karo
    if (session && (router.pathname === '/auth/signin')) {
        router.push('/');
        return null;
    }

    return <>{children}</>;
}
 