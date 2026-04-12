import Header from "../components/Header";
import { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";

function Home() {

    const [auth, setAuth] = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [wrong, setWrong] = useState(false);

    const singIn = () => {

      if(password == '1234'){
        setAuth(true);
        
      }else {
        setWrong(true);
      }  
      setPassword('');
    };

    return(
        <>
            <Header title="Home" />
            <div className="flex flex-col gap-4 m-16" >
                {wrong ?
                    <p className="bg-red-600 text-white p-4 rounded-xl w-1/4">
                    You entered wrong password 
                    </p>
                    : null
                }
                <h1 className="text-4xl font-semibold">
                    Want to see more? You are currently {auth ? 'signed in' : 'signed out'}
                </h1>
                <p>
                    Enter the password below to access protected content
                </p>
                <input onChange={(e) => setPassword(e.target.value)} className="border-2 border-gray-300 oytline-none w-1/4 p-2" placeholder="Password" type="password" />
                <button onClick={singIn} className="bg-rose-500 text-white p-2 w-1/4" >
                    Sign In
                </button>
            </div>
        </>
        
    );
}

export default Home;