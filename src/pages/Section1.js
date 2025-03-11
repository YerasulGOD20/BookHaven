import React, { useState } from "react";
import '../pages/section1.css';
import { Button } from "antd";
import bookImage from '../image/book.png';
import { authenticateUser, createUser } from '../api';
import { useNavigate } from 'react-router-dom';
import Nav from '../menu';
import { AuthModal } from '../componets/authmodal';

function Section1() {
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const Enter = (e) => {
        e.target.style.backgroundColor = 'black';
        e.target.style.color = 'white';
    };

    const Leave = (e) => {
        e.target.style.backgroundColor = '#C0AF84';
        e.target.style.border = 'none';
    };

    const handleSignIn = async (e, email, password) => {
        e.preventDefault();
        try {
            const user = await authenticateUser(email, password);
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert(`Welcome back, ${user.name}!`);
            navigate('/profile');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignUp = async (e, name, email, password) => {
        e.preventDefault();
        const newUser = { name, email, password };
        try {
            await createUser(newUser);
            alert('Registration successful!');
            setIsSignUpOpen(false);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            <div className="container" style={{ height: '100vh' }}>
                <Nav className="NavBar" />
                <div className="section_info">
                    <div>
                        <img src={bookImage} className="section-img" alt="Book" />
                    </div>
                    <div className="content__info">
                        <h1>About BookHaven</h1>
                        <p className="color">We make books great again. Just kidding, books were always great!</p>
                        <p className="sub_info">Every month, we send our subscribers a box with the five best books of the month. These are bestsellers and classic books that deserve to be read and placed on your bookshelf. We select books according to the preferences of our customers. In addition, you can always attend our events, join the book club or just visit our offline store in Almaty.</p>
                        {error && <p className="error">{error}</p>}
                        <span className="buttons">
                            <Button
                                type="primary"
                                className="btnLog"
                                onMouseEnter={Enter}
                                onMouseLeave={Leave}
                                onClick={() => setIsSignInOpen(true)}
                            >
                                Login
                            </Button>
                            <Button
                                className="btnSign"
                                onMouseEnter={Enter}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = 'white';
                                    e.target.style.color = 'black';
                                }}
                                onClick={() => setIsSignUpOpen(true)}
                            >
                                Sign up
                            </Button>
                        </span>
                    </div>
                </div>
            </div>
            <AuthModal
                isSignInOpen={isSignInOpen}
                isSignUpOpen={isSignUpOpen}
                closeSignIn={() => setIsSignInOpen(false)}
                closeSignUp={() => setIsSignUpOpen(false)}
                handleSignIn={handleSignIn}
                handleSignUp={handleSignUp}
                error={error}
            />
        </>
    );
}

export default Section1;
