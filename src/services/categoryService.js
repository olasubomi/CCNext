import axios from "../util/Api";

export const getAllCategories = async (searchItem) => {
  //   const response = await axios.get(`/api/items/${searchItem}`);
  const response = await axios.get(`/categories/get-all-categories/`);

  return response.data;
};

