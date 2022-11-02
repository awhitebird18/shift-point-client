import axios from "axios";

export const setCurrentUser = () => {
  return async (dispatch) => {
    const { data } = await axios.get("userAccounts/currentuser");

    if (data.preferences && data.preferences.colorCode) {
      document.documentElement.style.setProperty(
        "--color-primary",
        data.data.preferences.colorCode
      );
    }

    dispatch({
      type: "STORE_CURRENT_USER",
      payload: data.data,
    });
  };
};
