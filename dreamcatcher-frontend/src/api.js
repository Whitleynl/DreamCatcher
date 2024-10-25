import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL.replace(/\/$/, '');
console.log('Creating API with baseURL:', baseURL);

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
  console.log('Outgoing request:', {
    url: request.url,
    headers: request.headers,
    method: request.method
  });
  return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('Response received:', {
      status: response.status,
      headers: response.headers,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('Request failed:', {
      status: error.response?.status,
      data: error.response?.data,
      config: {
        url: error.config?.url,
        headers: error.config?.headers
      }
    });
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (userData) => api.post('/auth/registration/', userData),
  login: (credentials) => api.post('/auth/login/', credentials),
  logout: () => api.post('/auth/logout/')
};

export default api;