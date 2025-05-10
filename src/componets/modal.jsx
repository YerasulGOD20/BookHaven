import React, { useState, useEffect } from "react";
import "../style/modal.css";

function Modal({ isOpen, onClose, product, onReviewAdd }) {
    const [reviewText, setReviewText] = useState("");
    const [showReviews, setShowReviews] = useState(false);
    const [localReviews, setLocalReviews] = useState([]);

    // Сбрасываем локальные отзывы при изменении выбранного продукта
    useEffect(() => {
        if (product) {
            setLocalReviews(product.reviews || []);
        }
    }, [product]);

    const handleAddReview = async () => {
        if (!reviewText.trim()) {
            alert("Введите текст отзыва!");
            return;
        }

        // Добавляем новый отзыв в локальный список
        const updatedReviews = [...localReviews, reviewText];
        setLocalReviews(updatedReviews); // Обновляем локальное состояние отзывов
        onReviewAdd(product.id, updatedReviews); // Передаем обновления в родительский компонент

        // Очищаем поле ввода
        setReviewText("");

        // Отправляем изменения на сервер
        try {
            const updatedProduct = { ...product, reviews: updatedReviews };

            const response = await fetch(`http://localhost:5002/books/${product.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });

            if (!response.ok) {
                throw new Error("Ошибка при обновлении отзыва на сервере");
            }

            alert("Отзыв добавлен!");
        } catch (error) {
            console.error("Ошибка при добавлении отзыва:", error);
            alert("Ошибка при добавлении отзыва на сервер. Попробуйте снова.");
        }
    };

    const toggleShowReviews = () => {
        setShowReviews(!showReviews);
    };

    if (!isOpen || !product) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{product.title}</h2>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src={product.coverImage} alt={product.title} />
                    <p className="modal-p">{product.description2}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p className="modal-p"><strong>Price: </strong> ${product.price}</p>
                    {product.rating && <p style={{ color: "black" }}><strong>Оценка:</strong> {product.rating} / 5</p>}
                </div>
                <div>
                    <h3 onClick={toggleShowReviews} style={{ cursor: "pointer", color: "black" }}>
                        {showReviews ? "Скрыть отзывы" : "Показать отзывы"}
                    </h3>
                    {showReviews && (
                        <div className="reviews-scroll">
                            {localReviews.length > 0 ? (
                                <ul>
                                    {localReviews.map((review, index) => (
                                        <li key={index} style={{ color: 'black' }}>{review}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p style={{ color: 'black' }}>Отзывов пока нет.</p>
                            )}
                        </div>
                    )}
                </div>

                <div className="add-review">
                    <textarea
                        placeholder="Напишите ваш отзыв..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                    <button onClick={handleAddReview}>Добавить отзыв</button>
                </div>
                <button className="close-button" onClick={onClose}>
                    Закрыть
                </button>
            </div>
        </div>
    );
}

export default Modal;