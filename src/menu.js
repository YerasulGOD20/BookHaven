import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './image/mylogo.png';
import './style/nav.css';
import './style/common.css';
import icon1 from './image/facebook-16.png';
import icon2 from './image/insta.png';
import icon3 from './image/twit.png';
import icon4 from './image/user.png';
import { authenticateUser} from './api';
import { AuthModal } from './componets/authmodal';

function Nav() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const navigate = useNavigate();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); 
    const onMouseEnter = (e) => {
        e.target.style.color = '#C0AF84';
    };

    const onMouseLeave = (e) => {
        e.target.style.color = 'whitesmoke';
    };

    const handleIconClick = () => {
        if (currentUser) {
            navigate('/profile'); 
        } else {
            setIsSignInOpen(true); 
        }
    };

    const handleSignIn = async (e, email, password) => {
        e.preventDefault();
        try {
            const user = await authenticateUser(email, password); 
            localStorage.setItem('currentUser', JSON.stringify(user)); 
            setIsSignInOpen(false); 
            navigate('/profile'); 
        } catch (error) {
            alert(error.message); 
        }
    };

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header_row">
                        <div
                            className="logo"
                            onClick={() => navigate('/')}
                            style={{ cursor: 'pointer' }}
                        >
                            <img src={logo} alt="Logo" />
                        </div>
                        <nav className="header_nav">
                            <ul>
                                <li>
                                    <Link
                                        to="/AboutUs"
                                        onMouseEnter={onMouseEnter}
                                        onMouseLeave={onMouseLeave}
                                    >
                                        About us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/BooksOfMonth"
                                        onMouseEnter={onMouseEnter}
                                        onMouseLeave={onMouseLeave}
                                    >
                                        Books of the month
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/OurBookshop"
                                        onMouseEnter={onMouseEnter}
                                        onMouseLeave={onMouseLeave}
                                    >
                                        Our bookshop
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="#!"
                                        onMouseEnter={onMouseEnter}
                                        onMouseLeave={onMouseLeave}
                                    >
                                        Contact us
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="icons">
                            <ul>
                                <li>
                                    <a href="#!">
                                        <img src={icon1} alt="Icon 1" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <img src={icon2} alt="Icon 2" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#!">
                                        <img src={icon3} alt="Icon 3" />
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={handleIconClick}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            padding: 0,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        <img
                                            src={icon4}
                                            alt="Icon 4"
                                            style={{ width: '24px' }}
                                        />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </header>
            <AuthModal
                isSignInOpen={isSignInOpen}
                isSignUpOpen={false} 
                closeSignIn={() => setIsSignInOpen(false)}
                closeSignUp={() => {}} 
                handleSignIn={handleSignIn}
                handleSignUp={() => {}}
                error={null}
            />
        </>
    );
}

export default Nav;
