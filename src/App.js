import React, { useState } from 'react';
import './App.css';
import Nav from './menu'; 
import Main from './componets/main';
import Footer from './componets/footer';
import { Routes, Route } from 'react-router-dom';
import { authenticateUser } from './api';
import ProfilePage from './pages/UserProfile';
import Section2 from './pages/section2';
import Cart from './pages/cart';

function App() {
  const [user, setUser] = useState(null); 

  const handleSignIn = async (email, password) => {
    try {
      const authenticatedUser = await authenticateUser(email, password); 
      setUser(authenticatedUser); 
      console.log('User authenticated:', authenticatedUser);
    } catch (error) {
      console.error('Error during sign-in:', error.message);
    }
  };

  return (
    <div className="App">
      <Nav onSignIn={handleSignIn} user={user} />
      <Routes>
        <Route path="/" element={<Main />} /> 
        <Route path="/profile" element={<ProfilePage />} /> 
        <Route path="/books" element={<Section2 />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
