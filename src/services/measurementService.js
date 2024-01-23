import axios from "../util/Api";

export const getAllMeasurements = async () => {
  const response = await axios.get(`/measurement/`);
  // const response = await axios.get(`/measurement/10`);

  return response.data;
};

// pulic status
