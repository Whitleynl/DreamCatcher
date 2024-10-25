import axios from 'axios';

console.log('Creating API with baseURL:', process.env.REACT_APP_BACKEND_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const authApi = {
  register: (userData) => {
    console.log('Making registration request to:', `${process.env.REACT_APP_BACKEND_URL}/auth/registration/`);
    return api.post('/auth/registration/', userData);
  },
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/'),
};

export default api;