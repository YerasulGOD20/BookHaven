import React, { useState } from 'react';

export const AuthModal = ({
    isSignInOpen,
    isSignUpOpen,
    closeSignIn,
    closeSignUp,
    handleSignIn,
    handleSignUp,
    error,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <>
            {isSignInOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Sign In</h2>
                        <form onSubmit={(e) => handleSignIn(e, email, password)}>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Sign In</button>
                            <button type="button" onClick={closeSignIn}>Cancel</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            )}
            {isSignUpOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Sign Up</h2>
                        <form onSubmit={(e) => handleSignUp(e, name, email, password)}>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Sign Up</button>
                            <button type="button" onClick={closeSignUp}>Cancel</button>
                        </form>
                        {error && <p className="error">{error}</p>}
                    </div>
                </div>
            )}
        </>
    );
};
