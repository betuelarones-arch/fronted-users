import axios from 'axios';

const DEFAULT_PROD_URL = 'https://crud-users-1-g57m.onrender.com/api';
const baseURL =
  (import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.replace(/\/$/, '')) ||
  (import.meta.env.DEV ? 'http://localhost:3000' : DEFAULT_PROD_URL);

const api = axios.create({ baseURL });

export default api;
