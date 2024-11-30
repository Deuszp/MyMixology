import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor for JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Auth endpoints
export const auth = {
    login: (username: string, password: string) => 
        api.post('/api/auth/login', { username, password }),
    
    register: (username: string, email: string, password: string) =>
        api.post('/api/auth/register', { username, email, password }),
    
    getProfile: () => api.get('/api/auth/profile'),
};

// Groups endpoints
export const groups = {
    create: (name: string, members: string[]) =>
        api.post('/api/groups', { name, members }),
    
    getAll: () => api.get('/api/groups'),
    
    getOne: (id: number) => api.get(`/api/groups/${id}`),
    
    addMember: (groupId: number, username: string) =>
        api.post(`/api/groups/${groupId}/members`, { username }),
};

// Expenses endpoints
export const expenses = {
    create: (groupId: number, amount: number, description: string, paidBy: number, splitBetween: number[]) =>
        api.post('/api/expenses', { groupId, amount, description, paidBy, splitBetween }),
    
    getForGroup: (groupId: number) => 
        api.get(`/api/groups/${groupId}/expenses`),
    
    getAll: () => api.get('/api/expenses'),
};

export default api;
