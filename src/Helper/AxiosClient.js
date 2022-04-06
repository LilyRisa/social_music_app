import axios from 'axios';

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}`,
    headers: {
        'content-type': 'application/json',
        'Authorization' : JSON.parse(localStorage.getItem('auth')) != null ? (JSON.parse(localStorage.getItem('auth'))).token : null
    }
})
export default axiosClient