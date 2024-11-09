
import Spinner from "@/components/Spinner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignIn() {
    const [loading, setLoading] = useState("");
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const router = useRouter();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();

       try {
        const result = await signIn('credentials', {
            redirect: false,
            email: form.email,
            password: form.password,

        })
        if (!result.error) {
            router.push('/')
        } else {
            setError('Invalid email or Password')
            setTimeout(() => {
                setError('');
            }, 4000);
        }

       } catch (error) {
        setError('Sign-in failed, please try Again later')
        setTimeout(() => {
            setError('');
        }, 4000);
       } finally {

       setLoading(false);
        setTimeout(() => {
            setError('');
        }, 4000);
       }
    };

      if (status == "loading") {
        return  <div className="flex flex-center w-100 flex-col"><Spinner/></div>
      }

    return (
        <div className="flex flex-center full-h">
        <div className="loginform">
            <div className="heading">Signup - Create Admin</div>
            {loading ? <div className="flex flex-center w-100 flex-col"><Spinner/>Checking...</div> : <></>}
            <form className="form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    className="input"  
                    placeholder="Enter your email" 
                    onChange={handleChange} 
                />
                <input 
                    type="password" 
                    name="password" 
                    className="input"  
                    placeholder="Enter password" 
                    onChange={handleChange} 
                />
            
                <button className="login-button" type="submit">Sign Up</button>
                {error && <p>{error}</p>}
            </form>

            <span className="agreement"><a target="_blank" href="https://www.instagram.com/manish_nemade_190/">Connect to Admin</a></span>
        </div>
    </div>
    );

}
