const initialState = { currentUser: {}, users: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_CURRENT_USER":
      return { ...state, currentUser: action.payload };

    default:
      return state;
  }
};

export default reducer;
