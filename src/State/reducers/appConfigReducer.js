const initialState = {
  breakTemplates: [],
  clientId: "",
  overtime: [],
  scheduledRounding: {
    beforeStart: {
      window: "",
      beforeWindowType: "",
      beforeWindowUnit: "",
      afterWindowType: "",
      afterWindowUnit: "",
    },
    afterStart: {
      window: "",
      beforeWindowType: "",
      beforeWindowUnit: "",
      afterWindowType: "",
      afterWindowUnit: "",
    },
    beforeEnd: {
      window: "",
      beforeWindowType: "",
      beforeWindowUnit: "",
      afterWindowType: "",
      afterWindowUnit: "",
    },
    afterEnd: {
      window: "",
      beforeWindowType: "",
      beforeWindowUnit: "",
      afterWindowType: "",
      afterWindowUnit: "",
    },
  },
  shiftRules: {},
  startOfWeekIndex: 0,
  templates: [],
  unscheduledRounding: {
    startType: "",
    startUnit: "",
    endType: "",
    endUnit: "",
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_APP_CONFIG":
      return action.payload;

    default:
      return state;
  }
};

export default reducer;
