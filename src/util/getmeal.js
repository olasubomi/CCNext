import axios from "./Api";

export function getMeal(id){
    return axios.get('/meals/get-meal/'+id);
  }