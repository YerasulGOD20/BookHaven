import React, { useEffect, useState, useCallback, useMemo } from 'react';   
import '../pages/section2.css';
import SideBar from "../componets/sideBar";
import Product from "../componets/product";
import Nav from "../menu"
import { FaSearch } from 'react-icons/fa';

function Section2() {
    const [books, setBooks] = useState([]); 
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState('');
    const [sortByPriceAsc, setSortByPriceAsc] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
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
        if (genre === "Show All") {
            fetchBooks(); 
        } else {
            fetchBooksByGenre(genre); 
        }
    }, [fetchBooks, fetchBooksByGenre]);

    useEffect(() => {
        fetchBooks();
    }, [fetchBooks]);
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Nav/>
            <SideBar onSelectGenre={handleSelectGenre} />

            {}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Поиск по названию..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
                 <span className="search-icon">
                    <FaSearch />
                </span>
            </div>            
            {error && <p className="error-message">{error}</p>}

            <div className="product">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
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
                    <p>Книги не найдены...</p> 
                )}
            </div>
        </>
    );
}

export default Section2;
