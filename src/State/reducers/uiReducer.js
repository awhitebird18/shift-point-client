const initialState = {
  breakModalId: null,
  premiumModalId: null,
  unsavedChanges: false,
  timesheetDate: null,
  timecardId: null,
  notifications: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "toggleBreakModal":
      return { ...state, breakModalId: action.payload.id };

    case "togglePremiumModal":
      return { ...state, premiumModalId: action.payload.id };

    case "toggleExtendedModal":
      return { ...state, timecardId: action.payload.id };

    case "SHOW_MODAL":
      return {
        ...state,
        modalProps: action.payload,
      };

    case "unsavedChanges":
      return { ...state, unsavedChanges: action.payload.value };

    case "setIsLoading":
      return { ...state, isLoading: action.payload.isLoading };

    case "setTimesheetDate":
      return { ...state, timesheetDate: action.payload.date };

    case "displayErrorMessage":
      return {
        ...state,
        errorMessage: {
          title: action.payload.errorTitle,
          message: action.payload.errorMessage,
        },
      };

    case "SET_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    default:
      return state;
  }
};

export default reducer;
