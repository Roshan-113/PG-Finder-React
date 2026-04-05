const API_URL = 'http://localhost:5000/api';

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const headers = {
    'Content-Type': 'application/json',
  };
  if (user && user.token) {
    headers['Authorization'] = `Bearer ${user.token}`;
  }
  return headers;
};

export const api = {
  // PG Listings
  getPGs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(`${API_URL}/pgs?${query}`);
    if (!response.ok) throw new Error('Failed to fetch PGs');
    return response.json();
  },
  
  getPGById: async (id) => {
    const response = await fetch(`${API_URL}/pgs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch PG details');
    return response.json();
  },
  
  createPG: async (pgData) => {
    const response = await fetch(`${API_URL}/pgs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(pgData),
    });
    if (!response.ok) throw new Error('Failed to create PG');
    return response.json();
  },

  // Auth
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  },
  
  register: async (userData) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    return response.json();
  },
  
  getProfile: async () => {
    const response = await fetch(`${API_URL}/users/profile`, {
      headers: getHeaders(),
    });
    if (!response.ok) throw new Error('Failed to fetch profile');
    return response.json();
  }
};
