import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/register", { email, password });
            setMessage(res.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
         <div className="w-full max-w-md p-8">
            <h2>Register</h2>
            <p>Already have a Courtfind account? </p>
            <button onClick={() => {navigate("/login");}}>
                LogIn
            </button>
            <br /> <br />
            <form onSubmit={handleRegister}>
                <label htmlFor="">Email</label><br />
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br /> <br />
                <label htmlFor="">Password</label><br />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br /> <br />
                <button type="submit">Sign Up</button>
                <p>By signing up, I agree to the Courtfind Terms of Use and Privacy Policy.</p>
            </form>
            <div className="flex items-center my-4">
                        <hr className="flex-grow border-t" />
                        <span className="mx-2 text-gray-500">Or</span>
                        <hr className="flex-grow border-t" />
            </div>
            {message && <p>{message}</p>}
        </div>
        </div>
        </div>
    );
};

export default Register;
