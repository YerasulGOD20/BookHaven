import React, { useEffect, useState, useCallback } from "react";
import '../pages/section2.css';
import SideBar from "../componets/sideBar";
import Product from "../componets/product";
import Nav from "../menu"

function Section2() {
    const [books, setBooks] = useState([]); 
    const [error, setError] = useState(null); 
    const [selectedGenre, setSelectedGenre] = useState(null);

    const fetchBooks = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:5002/books');
            if (!response.ok) {
                throw new Error('Error fetching books');
            }
            const data = await response.json();
            setBooks(data);
        } catch (err) {
            setError(err.message);
        }
    }, []);

    const fetchBooksByGenre = useCallback(async (genre) => {
        try {
            const response = await fetch(`http://localhost:5002/books?genre=${genre}`);
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }, []);

    const handleSelectGenre = useCallback((genre) => {
        setSelectedGenre(genre);
        fetchBooksByGenre(genre);
    }, [fetchBooksByGenre]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);

    return (
        <>
            <Nav/>
            <SideBar onSelectGenre={handleSelectGenre} />
            {error && <p className="error-message">{error}</p>}
            <div className="product">
                {books.length > 0 ? (
                    books.map((book) => (
                        <div className="product-item" key={book.id}>
                            <Product
                                key={book.id}
                                title={book.title}
                                image={book.coverImage} 
                                price={book.price}
                                info1={book.description}
                            />
                        </div>
                    ))
                ) : (
                    <p>Loading books...</p> 
                )}
            </div>
        </>
    );
}

export default Section2;
