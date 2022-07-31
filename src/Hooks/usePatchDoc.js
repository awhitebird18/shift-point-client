import axios from "axios";

const usePatchDoc = async (endpoint, updatedDoc) => {
  endpoint = endpoint.concat(`/${updatedDoc._id}`);

  const { data } = await axios.patch(endpoint, updatedDoc);

  return data.data;
};

export default usePatchDoc;
