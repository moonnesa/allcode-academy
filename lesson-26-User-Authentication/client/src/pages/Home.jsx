import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {

    const [secret, setSecret] = useState("");

    const logout = () => {
        localStorage.removeItem("token");
        setSecret("");
    };

    useEffect(() => {
        const getSecret = async () => {
            await fetch("http://localhost:4000/secret-sauce", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(async (data) => {
                const res = await data.json();
                if (res.secretSauce) {
                    setSecret(res.secretSauce);
                } else if (res.error) {
                    setSecret(res.error);
                } else {
                    setSecret("An unknown error occurred.");
                }
            });
        };

        if (localStorage.getItem("token")) {
            getSecret();
        }
    }, []);

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">
            The Secret Sauce
        </h1>
        {secret ? 
            <p className="bg-green-500 text-white p-4 rounded-xl">
                {secret}
            </p> : 
            <p className="text-gray-600">
                Only for authenticated users
            </p>
        }
        
        <div className="flex gap-4">
            {secret ? (
            <button className="underline font-semibold" onClick={logout}>
                Logout
            </button>
            ) : (<><Link to="/login" className="px-4 py-2 bg-blue-500 text-white rounded">Login</Link>
                <p>or</p>
            <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Register</Link> </>
            )}
        </div>
    </main>
  );
}