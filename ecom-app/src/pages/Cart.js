import { useContext } from "react";
import CartContext from "../context/CartContext";

function Cart () {

    const [cart, setCart] = useContext(CartContext);

    function RemoveFromCart(id) {
        const newCart = cart.filter((cartItem) => cartItem.id !== id);

        setCart(newCart);

    }

    return(
        <div className="mx-20 my-8">
            <h1 className="text-4xl font-semibold mb-6">Cart</h1>
            <div className="flex flex-col gap-8 p-4 bg-blue-200">

                {!(cart.length>0) ? 'No products have been added to your cart' : null }

                {cart.map((cartItem, index) => (

                    <div className="flex gap-4 items-center">
                        <img src={cartItem.imgUrl} className="w-[10rem] h-[10rem] object-cover"/>
                        <div>
                            <h3 className="text-2xl"> {cartItem.name}</h3>
                            <button className="text-red-500 underline" onClick={() => RemoveFromCart(cartItem.id)}>Remove from cart</button>

                        </div>
                    </div>
                ))}

            {(cart.length>0) ? 
                <button className="bg-blue-500 text-white p-4 rounded-xl text-center">
                    Checkout
                </button>
            : null }
            </div>
        </div>
    );
}

export default Cart;