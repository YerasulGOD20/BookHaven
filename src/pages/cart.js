import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/cart.css"; 
import Nav from '../menu';

function Cart() {
    const [cartItems, setCartItems] = useState([]); 
    const [totalPrice, setTotalPrice] = useState(0); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch("http://localhost:5002/profile/cart"); 
                const data = await response.json();
                setCartItems(data);
                calculateTotalPrice(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    
    const calculateTotalPrice = (items) => {
      const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0); 
      setTotalPrice(total);
    };

    
    const handleRemoveItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:5002/profile/cart/${id}`, {
                method: "DELETE", 
            });
            if (response.ok) {
                const updatedCart = cartItems.filter((item) => item.id !== id);
                setCartItems(updatedCart);
                calculateTotalPrice(updatedCart);
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    
    const handleCheckout = async () => {
        try {
            
            const response = await fetch("http://localhost:5002/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: cartItems, totalPrice }),
            });
            if (response.ok) {
                alert("Thank you for your purchase!");
                setCartItems([]); 
                navigate("/"); 
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    
    const formatPrice = (price) => {
        return !isNaN(price) ? parseFloat(price).toFixed(2) : "0.00";
    };

    return (
        <><Nav className="NavBar" />
         <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    <ul className="cart-items">
                        {cartItems.map((item) => {
                            const formattedPrice = formatPrice(item.price); 
                            return (
                                <li key={item.id} className="cart-item">
                                    <img src={item.image} alt={item.title} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{item.title}</h3>
                                        <p>Price: ${formattedPrice}</p> {/* Используем отформатированную цену */}
                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="remove-item-btn"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="cart-summary">
                        <h2>Total: ${formatPrice(totalPrice)}</h2> {/* Форматируем общую цену */}
                        <button onClick={handleCheckout} className="checkout-btn">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
        </>
    );
}

export default Cart;
