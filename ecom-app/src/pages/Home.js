import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Products from "../components/Products";

function Home() {

    const [featured, setFeatured] = useState({});

    useEffect(() => {
        async function fetchFeaturedProduct () {

            await fetch("https://play-ecom-api.allcodeapp.com/api/featured")
                .then(
                    async (data) => {
                        const response = await data.json();
                        setFeatured(response);
                    });

        }
       fetchFeaturedProduct(); 
    }, []);

    return(
        <main>
            <header className="h-[40rem] w-screen relative">
                <img src={featured.bannerUrl} className="h-[40rem] w-screen object-cover" />
                <div className="flex justify-center items-center h-[40rem] w-screen top-0 bottom-0 absolute bg-blue-100/20">
                    <div className="flex flex-col">
                        <h1 className="text-5xl font-medium text-blue-600 mb-10">{featured.promoTitle}</h1>
                        <div className="text-center">
                            <Link to={"/product/" + featured.id} className="bg-blue-600 w-[10rem] p-4 font-medium text-white rounded-xl">
                                View Product
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <Products/>
        </main>
        
    );
}

export default Home;