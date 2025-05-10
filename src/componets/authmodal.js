import React, { useState } from 'react';
import { authenticateUser, registerUser } from '../api';

export const AuthModal = ({
    isSignInOpen,
    isSignUpOpen,
    closeSignIn,
    closeSignUp,
    onLoginSuccess,
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const user = await authenticateUser(email, password);
            setIsLoading(false);
            if (onLoginSuccess) {
                onLoginSuccess(user);
            }
            closeSignIn();
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const user = await registerUser(name, email, password);
            setIsLoading(false);
            if (onLoginSuccess) {
                onLoginSuccess(user);
            }
            closeSignUp();
        } catch (error) {
            setIsLoading(false);
            setError(error.message);
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setName('');
        setError('');
    };

    return (
        <>
            {isSignInOpen && (
                <div className="auth-modal">
                    <div className="auth-modal-content">
                        <span className="close-button" onClick={() => { closeSignIn(); resetForm(); }}>&times;</span>
                        <h2>Sign In</h2>
                        <form onSubmit={handleSignIn}>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <div className="button-group">
                                <button 
                                    type="submit" 
                                    className="auth-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {isSignUpOpen && (
                <div className="auth-modal">
                    <div className="auth-modal-content">
                        <span className="close-button" onClick={() => { closeSignUp(); resetForm(); }}>&times;</span>
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSignUp}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <p className="error-message">{error}</p>}
                            <div className="button-group">
                                <button 
                                    type="submit" 
                                    className="auth-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Creating account...' : 'Create Account'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AuthModal;