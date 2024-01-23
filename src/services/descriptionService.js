import axios from "../util/Api";

export const getAllDescription = async (searchItem) => {
  //   const response = await axios.get(`/api/items/${searchItem}`);
  const response = await axios.get(`/description/`);

  return response.data;
};