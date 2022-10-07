import Axios from 'axios';


console.error("______ process.env.NODE_ENV ____", process.env.NODE_ENV)
// let base_url = `http://localhost:3000/api/`;
let base_url = `https://chopchowdev.herokuapp.com/api/`;

if (process.env.NODE_ENV !== "development") {
    base_url = `https://chopchowdev.herokuapp.com/api/`;
}

let axios = Axios.create({
    baseURL: base_url,  //YOUR_API_URL HERE
    headers: {
        'Content-Type': 'application/json',
    }
});

if (typeof window !== 'undefined') {

    const token = JSON.parse(localStorage.getItem('token'));

    console.error("__ token __", token);
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
}
export default axios;
