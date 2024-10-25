import axios from 'axios';

// Remove any trailing slashes from the base URL
const baseURL = process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '');
console.log('Creating API with baseURL:', baseURL);

const api = axios.create({
  baseURL,
});

export const authApi = {
  register: (userData) => {
    console.log('Making registration request to:', `${baseURL}/auth/registration/`);
    return api.post('/auth/registration/', userData);
  },
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/')
};

export default api;