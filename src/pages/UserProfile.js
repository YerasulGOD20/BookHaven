import React, { useEffect, useState, useMemo } from 'react';
import '../pages/UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaCamera } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Nav from "../menu"

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
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

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result);
            };
            reader.readAsDataURL(file);
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
                        email: editedEmail,
                        password: newPassword || user.password
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to update user data');
                }
                const updatedUser = await response.json();
                setUser(updatedUser);
                setIsEditing(false);
                setNewPassword('');
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
        }, 1000);
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.id) {
            fetchUserProfile(currentUser.id);
        } else {
            setError('No user is logged in');
        }
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
        <Nav/>
        <div className="profile-page">
            <h1>User Profile</h1>
            {user ? (
                <div className="profile-container">
                    <div className="avatar-section">
                        <div className="avatar-frame">
                            {avatar ? (
                                <img src={avatar} alt="User avatar" />
                            ) : (
                                <div className="placeholder-avatar"><FaCamera /></div>
                            )}
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
                        </div>
                    </div>

                    <div className="info-section">
                        {isEditing ? (
                            <>
                                <input
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    value={editedEmail}
                                    onChange={(e) => setEditedEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="New Password"
                                />
                            </>
                        ) : (
                            <div className="user-details">  
                                <p><strong>Name:</strong> {user.name}</p>
                                <p><strong>Email:</strong> {user.email}</p>
                            </div>
                        )}
                    </div>

                    <div className="button-section">
                        {isEditing ? (
                            <>
                                <button onClick={handleSaveChanges}>Save</button>
                                <button onClick={() => setIsEditing(false)}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                        )}
                        <button onClick={handleSignOut}>Sign Out</button>
                        <Link to='/cart'><button><FaShoppingBag /></button></Link>
                    </div>

                </div>
            ) : (
                <p className="loading-message">Loading user data...</p>
            )}
        </div>
    </>
    );
};

export default ProfilePage;
