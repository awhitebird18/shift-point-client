const initialState = {
  statusError: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setStatusError':
      return { ...state, statusError: { ...action.payload } };

    default:
      return state;
  }
};

export default reducer;
