import axios from 'axios';
const header = {
    'content-type': 'application/json',
}

if(localStorage.getItem('auth') != 'undefined'){
    header.Authorization = JSON.parse(localStorage.getItem('auth')) != null ? "Bearer "+(JSON.parse(localStorage.getItem('auth'))).token : null
}else{
    header.Authorization = null
}

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_API_HOST}`,
    headers: header
})
export default axiosClient