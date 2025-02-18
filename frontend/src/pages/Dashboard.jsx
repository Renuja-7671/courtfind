import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const res = await axios.get("http://localhost:3000/dashboard", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMessage(res.data.message);
            } catch (error) {
                setMessage("Access denied. Please log in.");
                navigate("/login");
            }
        };
        fetchDashboard();
    }, [navigate]);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>{message}</p>
            <button onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
            }}>
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
