import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import "../style/product.css";

function Product(props) {
    const addToCart = async () => {
    const product = {
        id: props.id, // обязательно уникальный
        title: props.title,
        price: props.price,
        image: props.image
    };

    try {
        const response = await fetch("http://localhost:5002/cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            alert(`${product.title} added to cart!`);
        } else {
            console.error("Server error:", await response.text());
        }
    } catch (error) {
        console.error("Error adding item to cart:", error);
    }
};


    return (
        <div className="product-container">
            <div className="box">
                <div className="product-desc">
                    <img
                        src={props.image}
                        alt={props.title}
                        onClick={props.onImageClick}
                        style={{ cursor: "pointer" }}
                    />
                    <p className="product-title">{props.title}</p>
                    <p className="product-info1">{props.info1}</p>
                    <div className="product-line"></div>
                    <div className="price-info">
                        <p className="product-price">$ {props.price}</p>
                        <div className="product-btn">
                            <button onClick={() => addToCart(props)}>
                                <FaShoppingBag />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
