import axios from "axios";


const base_URL = import.meta.env.VITE_BACKEND_BASE_API


const axiosInstance = axios.create({
    baseURL: base_URL,
    headers: {
        'Content-Type': 'application/json',
    }

});

//Request Intercepters

axiosInstance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('access_token')
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    }
)

//Response Interceptors

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    }, async function (error) {              //handle error response
        const original_request = error.config;
        if (error.response.status === 401 && !original_request.retry) {
            original_request.retry = true;             // to prevent api endpoint endlessly
            const refresh_token = localStorage.getItem('refresh_token');
            try {
                const response = await axiosInstance.post('/token/refresh/', {refresh: refresh_token});
                localStorage.setItem('access_token',response.data.access);
                original_request.headers['Authorization'] = `Bearer ${response.data.access}`;
                return axiosInstance(original_request);
            } catch(error) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;