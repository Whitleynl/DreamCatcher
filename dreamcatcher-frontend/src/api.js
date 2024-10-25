import axios from 'axios';

// Remove any trailing slashes from the base URL
const baseURL = process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '');
console.log('Creating API with baseURL:', baseURL);

const api = axios.create({
  baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(request => {
    console.log('Making request to:', request.url);
    console.log('With headers:', request.headers);
    return request;
});

export const authApi = {
 register: (userData) => api.post('/auth/registration/', userData),
 login: (credentials) => api.post('/auth/login/', credentials),
 logout: () => api.post('/auth/logout/')
};

export default api;