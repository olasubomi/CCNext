import Axios from 'axios';
import { BASE_URL_LIVE, BASE_URL_DEV } from '../../api';


console.error("______ process.env.NODE_ENV ____", process.env.NODE_ENV)
let base_url = `http://localhost:3000/api/`;
// let base_url = `https://chopchowdev.herokuapp.com/api/`;

if (process.env.NODE_ENV !== "development") {
    // base_url = `https://chopchowdev.herokuapp.com/api/`;
    base_url = BASE_URL_LIVE
}else{
    // base_url = `http://localhost:5000/api/`;
    base_url = BASE_URL_DEV
}


let axios = Axios.create({
    baseURL: base_url,  //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
    }
});

if (typeof window !== 'undefined') {

    const token = localStorage.getItem('x-auth-token');

    console.error("__ token __", token);
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}
export {base_url}
export default axios;
