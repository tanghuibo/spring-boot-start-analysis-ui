import axios from 'axios';


const request = axios.create({
    baseURL: "/"
});

request.interceptors.response.use(response => response.data)

export default request;