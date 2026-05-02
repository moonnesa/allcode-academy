import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Register() {

    const navigate = useNavigate();
    const [error, setError] = useState(null);
    
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
    });

    const register = async () => {
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        await fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then( async (data) => {
            
            const res = await data.json();
            
            if (res.success) {
                navigate("/login");
            } else if (res.error) {
                setError(res.error);
            } else {
                setError("An unknown error occurred");
            }
        });
    };

    const handleFormChange = async (e) => {

        const {name, value} = e.target;
        setFormData((prevFormdata)  => ({
            ...prevFormdata, 
            [name]: value
        }));
    };

    return (
        <main className="h-screen flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">
                Register
            </h2>
            <p>
                Register a new account!
            </p>
            {error ? 
                <p className="bg-red-500 text-white p-4 rounded-xl">
                    {error}
                </p> : null
            }
            <input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="px-4 py-2 border rounded" 
                value={formData.email}
                onChange={handleFormChange}
            />
            <input 
                type="password" 
                name="password"
                placeholder="Password" 
                className="px-4 py-2 border rounded" 
                value={formData.password}
                onChange={handleFormChange}
            />
            <input 
                type="password" 
                name="confirmPassword"
                placeholder="Confirm Password" 
                className="px-4 py-2 border rounded" 
                value={formData.confirmPassword}
                onChange={handleFormChange}
            />
            <input 
                type="text"
                name="fullName" 
                placeholder="Full Name" 
                className="px-4 py-2 border rounded" 
                value={formData.fullName}
                onChange={handleFormChange}
            />

            <button onClick={register} className="px-4 py-2 bg-green-500 text-white rounded">
                Register
            </button>
        </main>
    );
}