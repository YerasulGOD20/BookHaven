import React, { useEffect, useState, useMemo } from 'react';
import '../pages/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const navigate = useNavigate();

    const fetchUserProfile = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5002/users/${userId}`); 
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const data = await response.json();
            setUser(data);
            setEditedName(data.name); 
            setEditedEmail(data.email);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSaveChanges = async () => {
        if (user) {
            try {
                const response = await fetch(`http://localhost:5002/users/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...user,
                        name: editedName,
                        email: editedEmail
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to update user data');
                }
                const updatedUser = await response.json();
                setUser(updatedUser); 
                setIsEditing(false); 
            } catch (error) {
                setError(error.message);
            }
        }
    };

    const handleSignOut = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        setTimeout(() => {
            navigate('/'); 
        }, 3000); 
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.id) {
            fetchUserProfile(currentUser.id);
        } else {
            setError('No user is logged in');
        }
    }, []);

    const userInfo = useMemo(() => {
        if (!user) return null;
        return (
            <div>
                <p><strong>Name:</strong> <span className="user-info">{user.name}</span></p>
                <p><strong>Email:</strong> <span className="user-info">{user.email}</span></p>
            </div>
        );
    }, [user]);

    const loadingMessage = useMemo(() => {
        return <p className="loading-message">Loading user data...</p>;
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            {user ? (
                <div>
                    {isEditing ? (
                        <>
                            <p><strong>Name:</strong> 
                                <input 
                                    type="text" 
                                    value={editedName} 
                                    onChange={(e) => setEditedName(e.target.value)} 
                                />
                            </p>
                            <p><strong>Email:</strong> 
                                <input 
                                    type="email" 
                                    value={editedEmail} 
                                    onChange={(e) => setEditedEmail(e.target.value)} 
                                />
                            </p>
                            <button onClick={handleSaveChanges}>Save Changes</button>
                            <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <>
                            {userInfo}
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </>
                    )}
                    <button onClick={handleSignOut}>Sign Out</button>
                    <Link to='/cart'><button><FaShoppingBag/></button></Link>
                </div>
            ) : (
                loadingMessage
            )}
        </div>
    );
};

export default ProfilePage;
