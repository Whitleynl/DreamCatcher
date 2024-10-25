import axios from 'axios';

const api = axios.create({ 
    baseURL: process.env.REACT_APP_BACKEND_URL, 
});

export const authApi = {
    register: (userData) => api.post('/auth/registration/', userData),
    login: (credentials) => api.post('/auth/login/', credentials),
    logout: () => api.post('/auth/logout/'),
}

export default api;