import axios from "./Api";

export function getMeal(id){
    return axios.get('http://localhost:5000/api/meals/get-meal/'+id);
  }