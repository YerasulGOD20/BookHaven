const API_URL = 'http://localhost:5002/users'; 

export const getUsers = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export const createUser = async (userData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to create user');
    }
    return response.json();
};

export const authenticateUser = async (email, password) => {
    const users = await getUsers();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        return user;
    } else {
        throw new Error('Invalid credentials');
    }
};
