import axios from "axios";

export const fetchEmployees = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/employee");

    dispatch({
      type: "STORE_EMPLOYEES",
      payload: data.data,
    });
  };
};
