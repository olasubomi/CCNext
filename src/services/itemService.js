import axios from "../util/Api";

export const getItemNamesFilteredByProduct = async () => {
  const response = await axios.get(`/items?item_type=Product`)
  // const response = await axios.get(`/items/filter/${searchItem}`);

  return response.data;
};

export const getItemNamesFilteredByUtensils= async () => {
  const response = await axios.get(`/items?item_type=Utensil`);

  return response.data;
};

// export const getItemNamesFilteredByProduct = async (searchItem) => {
//   //   const response = await axios.get(`/api/items/${searchItem}`);
//   const response = await axios.get(`/items/filter/${searchItem}?item_type='Product'`);

//   return response.data;
// };

// product
// utielsis