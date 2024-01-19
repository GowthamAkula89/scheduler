import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Assuming JSON Server is running on this port
});

export default api;