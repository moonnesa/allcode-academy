import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Home() {

    const [secretSauces, setSecretSauces] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        setSecretSauces([]);
        setIsLoggedIn(false);
        setUser(null);
    };
    useEffect(() => {
        const getSecretSauces = async () => {
            await fetch("http://localhost:4000/get-secret-sauces", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(async (data) => {
                const res = await data.json();
                if (res.secretSauces) {
                    setSecretSauces(res.secretSauces);
                } else if (res.error) {
                    setSecretSauces(res.error);
                } else {
                    setSecret("An unknown error occurred.");
                }
            });
        };

        const getUser = async () => {
            await fetch("http://localhost:4000/current-user", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then(async (data) => {
                const res = await data.json();
                if (res.user) {
                    setUser(res.user);
                } else if (res.error) {
                    setUser(res.error);
                } else {
                    setUser("An unknown error occurred.");
                }
            });
        };

        if (localStorage.getItem("token")) {
            getSecretSauces();
            getUser();
        }
    }, []);

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-4"> 
            <h1 className="text-3xl font-bold">
            The Secret Sauce
            </h1>
            {user ? 
                <p className="text-gray-600">Welcome back, {user.fullName}!</p> 
                : <p className="text-gray-600">Discover the secret sauces shared by our community!</p>
            }
            {!user ? 
                <p className="text-gray-600">Please login to view and share your own secret sauces.</p> 
                : null
            }
            {isLoggedIn ?
                <Link to="/add-secret-sauce" className="bg-blue-500 text-white px-4 py-2 rounded hover:cursor-pointer">
                    Add Your Own Secret Sauce
                </Link> : null    
            }
            
        </div>
        {isLoggedIn && secretSauces.length > 0 ? 
            <div className="flex flex-col items-center gap-6">
                {secretSauces.map((secret, index) =>  ( 
                    <div key={index} className="bg-gray-100 p-4 rounded-xl">
                        {secret.secretContent}
                    </div>
                ))}
            </div> 
            : null
        }
        
        <div className="flex gap-4">
            {isLoggedIn ? (
            <button className="bg-red-500 text-white px-4 py-2 rounded hover:cursor-pointer" onClick={logout}>
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