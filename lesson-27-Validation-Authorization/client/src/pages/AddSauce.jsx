import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function AddSauce() {

    const navigate = useNavigate();
    const [error, setError] = useState("");
    
    const [secretSauce, setSecretSauce] = useState("");


    const handleFormChange = async (e) => {

        const {name, value} = e.target;
        setSecretSauce((prevSecretSauce)  => ({
            ...prevSecretSauce, 
            [name]: value
        }));
    };

    const addSecretSauce = async () => {
        await fetch("http://localhost:4000/add-secret-sauce", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ secretContent: secretSauce })
        }).then(async (res) => {
        
            const data = await res.json();

            if (data.success) {
                navigate("/");
            } else if (data.error) {
                setError(data.error);
                setSecretSauce("");
            } else {
                setError("An unknown error occurred.");
            }
        });
    };

    return (
        <main className="h-screen flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">
                Add Sauce
            </h2>
            <p>
                Add a new secret sauce to your collection!
            </p>
            {error ? 
                <p className="bg-red-500 text-white p-4 rounded-xl">
                    {error}
                </p> : null
            }

            <input 
                type="text"
                name="secretSauce" 
                placeholder="Your super secret sauce recipe ..." 
                className="px-4 py-2 border rounded" 
                value={secretSauce}
                onChange={(e) => setSecretSauce(e.target.value)}
            />

            <button onClick={addSecretSauce} className="px-4 py-2 bg-green-500 text-white rounded">
                Add Secret Sauce
            </button>
        </main>
    );
}