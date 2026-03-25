import axios from 'axios';

const api = axios.create({
    baseURL: 'https://crud-users-1-g57m.onrender.com/api' 
});

export default api;