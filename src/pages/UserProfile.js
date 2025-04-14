import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'
import '../pages/UserProfile.css';
import Nav from "../menu"
import '../pages/UserProfile.css';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from "react-icons/fa";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);  
    const navigate = useNavigate();    
    const [isEditing, setIsEditing] = useState(false); 
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');


    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser?.id) {
            fetchUserProfile(currentUser.id);
        } else {
            setError('No user is logged in');
        }
    }, []);

    const fetchUserProfile = async (userId) => {
        try {
            const response = await fetch(`http://localhost:5002/users/${userId}`); 
            if (!response.ok) throw new Error('Failed to fetch user data');
            const data = await response.json();
            setUser(data);
            setEditedName(data.name); 
            setEditedEmail(data.email);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSaveChanges = async () => {
        if (!user) return;
        try {
            const response = await fetch(`http://localhost:5002/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...user,
                    name: editedName,
                    email: editedEmail
                })
            });
            if (!response.ok) throw new Error('Failed to update user data');
            const updatedUser = await response.json();
            setUser(updatedUser); 
            setIsEditing(false); 
        } catch (error) {
            setError(error.message);
        }
    };
    /*
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);  // Store the selected file
        }
    };

    const handleImageUpload = async (file) => {
        if (!file) return;
      
        const imageRef = ref(storage, `profile-pictures/${file.name}`); 
        await uploadBytes(imageRef, file); 
      
        const downloadURL = await getDownloadURL(imageRef); 
        return downloadURL;
        await fetch(`http://localhost:5002/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...user,
              profilePicture: downloadURL 
            })
          });
          
          setUser({ ...user, profilePicture: downloadURL });
      };
      */

      const handleSignOut = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        setTimeout(() => navigate('/'), 3000); 
    };

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser?.id) {
            fetchUserProfile(currentUser.id);
        } else {
            setError('No user is logged in');
        }
    }, []);

    if (error) return <div>Error: {error}</div>;

    return (
        <>
        <Nav className="NavBar"/>
        <div className="profile-sidebar">
                <img
                    src={user?.profilePicture || "/default-profile.png"}
                    alt="Profile"
                    className="profile-pic"
                />
                {isEditing ? (
                    <>
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                        />
                        <input
                            type="email"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                        />
                        <button onClick={handleSaveChanges}>Save</button>
                        <button onClick={() => setIsEditing(false)}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                )}
                <button onClick={handleSignOut}>Sign Out</button>
                <Link to="/cart"><button><FaShoppingBag /></button></Link>
            </div>
            <div className="profile-content">
                <div className="section-box">
                    <h2>Order History</h2>
                    {user?.orders?.length > 0 ? (
                        <ul>
                            {user.orders.map(order => (
                                <li key={order.id}>Order #{order.id} — {order.status}</li>
                            ))}
                        </ul>
                    ) : <p>No orders found.</p>}
                </div>
            </div>
    </>
    );
};

export default ProfilePage;


/*{}
                <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                />
                
                {}
                <button onClick={handleImageUpload}>Upload Profile Picture</button> */
                