import { useRouter } from "next/router";
import {  useState } from "react";

export default function SignUp() {
    const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const router = useRouter();


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        const res = await fetch(`/api/auth/signup`, {   
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        });

        const data = await res.json();
        if (data.error) {
            setError('Error occurred during signup');
            setTimeout(() => {
                setError(''); // Clear the error after 3 seconds
            }, 3000);
        } else {
            setError(''); // Clear the error on successful signup
            router.push('/auth/signin');
        }
        
    };

    return (
        <div className="flex flex-center full-h">
            <div className="loginform">
                <div className="heading">Signup - Create Admin</div>
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
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        className="input"  
                        placeholder="Enter confirm password" 
                        onChange={handleChange} 
                    />
                    <button className="login-button" type="submit">Sign Up</button>
                    {error && <p>{error}</p>}
                </form>
            </div>
        </div>
    );
}
