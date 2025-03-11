import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/cart.css"; // Стиль для корзины

function Cart() {
    const [cartItems, setCartItems] = useState([]); // Хранит товары в корзине
    const [totalPrice, setTotalPrice] = useState(0); // Общая стоимость корзины (начальное значение 0)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await fetch("http://localhost:5002/cart"); // Запрос на сервер для получения корзины
                const data = await response.json();
                setCartItems(data);
                calculateTotalPrice(data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };

        fetchCartItems();
    }, []);

    // Рассчитываем общую цену
    const calculateTotalPrice = (items) => {
      const total = items.reduce((sum, item) => sum + parseFloat(item.price), 0); // Преобразуем в число
      setTotalPrice(total);
    };

    // Удаляем товар из корзины
    const handleRemoveItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:5002/cart/${id}`, {
                method: "DELETE", // Отправляем запрос на сервер для удаления товара
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

    // Обрабатываем оформление заказа
    const handleCheckout = async () => {
        try {
            // Отправляем данные о заказе на сервер или обрабатываем оплату
            const response = await fetch("http://localhost:5002/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: cartItems, totalPrice }),
            });
            if (response.ok) {
                alert("Thank you for your purchase!");
                setCartItems([]); // Очищаем корзину после оформления заказа
                navigate("/"); // Перенаправляем на главную страницу
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };

    // Функция для безопасного форматирования цены
    const formatPrice = (price) => {
        return !isNaN(price) ? parseFloat(price).toFixed(2) : "0.00";
    };

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    <ul className="cart-items">
                        {cartItems.map((item) => {
                            const formattedPrice = formatPrice(item.price); // Форматируем цену
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
    );
}

export default Cart;
