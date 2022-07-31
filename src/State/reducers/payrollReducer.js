const initialState = { department: [], costcentre: [] };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_DATA2":
      return { ...state, [action.payload.type]: action.payload.data };

    default:
      return state;
  }
};

export default reducer;
