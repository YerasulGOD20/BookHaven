import React, { useState } from "react";
import { FaBars } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import '../style/sideBar.css';
import { Link } from "react-router-dom";
let Genres = [
    { id: 0, title: "Show All" },
    { id: 1, title: "Fantasy" },
    { id: 2, title: "Horror" },
    { id: 3, title: "Romance" },    
    { id: 4, title: "Science Fiction" },
    { id: 5, title: "Mystery" },
    { id: 6, title: "Thriller" },
    { id: 7, title: "Biography" },
    { id: 8, title: "History" },
    { id: 9, title: "Cooking" },
    { id: 10, title: "Children's Books" },
    { id: 11, title: "Comics" },
    { id: 12, title: "Art & Photography" },
    { id: 13, title: "Business" },
    { id: 14, title: "Education" },
    { id: 15, title: "Spirituality & Religion" }
];

function SideBar({ onSelectGenre }) { 

    const [sidebar, setSideBar] = useState(false);

    const showSideBar = () => {
        setSideBar(!sidebar);
    };

    const handleGenreClick = (genre) => {
        onSelectGenre(genre);  
        setSideBar(false);  
    };

    return (
        <>
            <div className="navbar">
                <Link to ="#" className="menu-bars">
                    <FaBars onClick={showSideBar} style={{ color: 'whitesmoke' }} />
                </Link>
            </div>
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSideBar}>
                    <li className="navbar-toggle">
                        <Link to ="#" className="menu-bars" style={{ color: 'black' }}>
                            <IoMdClose style={{ color: 'whitesmoke' }} />
                        </Link>
                    </li>
                    {Genres.map((item, index) => {
                        return (
                            <li key={index} className="nav-text">
                                <Link to="#" onClick={() => handleGenreClick(item.title)}> 
                                    <span className="item-span">{item.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}

export default SideBar;
