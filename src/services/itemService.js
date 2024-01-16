import axios from "../util/Api";

export const getFilterItems = async (searchItem) => {
  //   const response = await axios.get(`/api/items/${searchItem}`);

  const response = await axios.get(`/api/items/filter/b`);

  return response.data;
};
