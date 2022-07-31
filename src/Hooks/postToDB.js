import axios from "axios";

const postToDB = async (endpoint, doc, param) => {
  if (param) {
    endpoint = endpoint.concat(param);
  }

  const { data } = await axios.post(endpoint, doc);

  return data.data;
};

export default postToDB;
