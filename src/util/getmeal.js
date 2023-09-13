import axios from "./Api";
import { base_url } from "./Api";

export function getMeal(id){
    return axios.get(`${base_url}/meals/get-meal/`+id);
  }