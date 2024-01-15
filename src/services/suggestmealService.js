import axios from "../util/Api";

export const getItems = async () => {
  const response = await axios.get("/api/items");

  return response.data;
};

