// src/api.js
const API_URL = 'http://localhost:8000';

// Authentication API Functions
export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/users/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
        password2: password, // Django backend requires password confirmation
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.email || errorData.password || 'Registration failed');
    }

    const data = await response.json();
    // Store tokens in localStorage
    localStorage.setItem('accessToken', data.tokens.access);
    localStorage.setItem('refreshToken', data.tokens.refresh);
    return data.user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const authenticateUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/users/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Invalid email or password');
    }

    const data = await response.json();
    
    // Store tokens in localStorage
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
    
    // Store user info
    const userData = data.user;
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    return userData;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await fetch(`${API_URL}/api/users/logout/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    // Clear tokens regardless of response
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');

    return response.ok;
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear tokens on error
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/api/users/me/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired, try to refresh
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          return getUserProfile(); // Try again with new token
        } else {
          throw new Error('Session expired. Please login again.');
        }
      }
      throw new Error('Failed to fetch user profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Get profile error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/api/users/me/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    return await response.json();
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

export const changePassword = async (oldPassword, newPassword) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_URL}/api/users/change-password/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.old_password || errorData.new_password || 'Failed to change password');
    }

    return true;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
};

// Helper function to refresh the access token
const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }

    const response = await fetch(`${API_URL}/api/users/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
    });

    if (!response.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('currentUser');
      return false;
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.access);
    return true;
  } catch (error) {
    console.error('Token refresh error:', error);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('currentUser');
    return false;
  }
};

// Book-related API Functions
export const fetchBooks = async () => {
  try {
    const response = await fetch(`${API_URL}/api/books/`);
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch books error:', error);
    throw error;
  }
};

export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${API_URL}/api/books/search/?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Search failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Search books error:', error);
    throw error;
  }
};

export const getBookDetails = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/books/${id}/`);
    if (!response.ok) {
      throw new Error('Failed to fetch book details');
    }
    return await response.json();
  } catch (error) {
    console.error('Get book details error:', error);
    throw error;
  }
};