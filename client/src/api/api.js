import axios from 'axios';

// VITE_API_URL은 배포된 API 주소이며, Vite 빌드 시점에 설정해야 합니다.
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000/api' : undefined),
})

export default api;