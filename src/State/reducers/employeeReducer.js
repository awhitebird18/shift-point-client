const intialState = [];

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case "STORE_EMPLOYEES":
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
