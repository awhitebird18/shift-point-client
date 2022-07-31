const initialState = { keys: {} };

const addKeypress = (state, action) => {
  const stateCopy = { keys: { ...state.keys } };

  stateCopy.keys[action.payload] = true;

  return stateCopy;
};

const removeKeypress = (state, action) => {
  const stateCopy = { keys: { ...state.keys } };

  delete stateCopy.keys[action.payload];

  return stateCopy;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_KEYPRESS":
      return addKeypress(state, action);

    case "REMOVE_KEYPRESS":
      return removeKeypress(state, action);

    default:
      return state;
  }
};

export default reducer;
