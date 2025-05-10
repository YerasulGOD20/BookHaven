import React, { useEffect, useState } from 'react';
import './UserProfile.css';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag, FaCamera } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Nav from "../menu";
import { getUserProfile, updateUserProfile, changePassword, logoutUser } from '../api';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
                setEditedName(userData.name || '');
                setEditedEmail(userData.email || '');
                setIsLoading(false);
            } catch (error) {
                if (error.message.includes('Session expired')) {
                    localStorage.removeItem('currentUser');
                    navigate('/');
                }
                setError(error.message);
                setIsLoading(false);
            }
        };

        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/');
        } else {
            fetchUserData();
        }
    }, [navigate]);

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
        try {
            const updatedUser = await updateUserProfile({
                name: editedName,
                email: editedEmail
            });
            
            setUser(updatedUser);
            setIsEditing(false);
            
            // Update local storage with new user data
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            
            setMessage('Profile updated successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }
        
        try {
            await changePassword(oldPassword, newPassword);
            setIsChangingPassword(false);
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            
            setMessage('Password changed successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSignOut = async () => {
        try {
            await logoutUser();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout on client side even if server fails
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('currentUser');
            navigate('/');