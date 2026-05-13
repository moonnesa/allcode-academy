import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const login = async () => {
        const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (data.token) {
            localStorage.setItem("token", data.token);
            navigate("/");
        } else if (data.error) {
            setError(data.error);
        }else {
            setError("An unknown error occurred.");
        }
    };

    return (
        <main className="h-screen flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">
                Login
            </h2>
            <p>
                Login to your account!
            </p>
            {error ? 
                <p className="bg-red-500 text-white p-4 rounded-xl">
                    {error}
                </p> : null
            }
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Username" className="px-4 py-2 border rounded" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="px-4 py-2 border rounded" /> 
            <button onClick={login} className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
        </main>
    );
}