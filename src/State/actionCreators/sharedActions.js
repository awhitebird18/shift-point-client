import axios from "axios";

export const fetchDataAxios = (type) => {
  return async (dispatch) => {
    const { data } = await axios.get(type);

    dispatch({
      type: "STORE_DATA2",
      payload: {
        type: type,
        data: data.data,
      },
    });
  };
};
