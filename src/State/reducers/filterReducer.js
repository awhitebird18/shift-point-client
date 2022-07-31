// Timesheet Filters
const addTimesheetFilter = (state, action) => {
  const stateCopy = { ...state, timesheetFilter: [...state.timesheetFilter] };

  stateCopy.timesheetFilter.splice(action.payload.index + 1, 0, {});

  return stateCopy;
};

const removeTimesheetFilter = (state, action) => {
  const stateCopy = { ...state, timesheetFilter: [...state.timesheetFilter] };

  stateCopy.timesheetFilter.splice(action.payload.index, 1);

  return stateCopy;
};

const changeTimesheetFilter = (state, action) => {
  const stateCopy = { ...state, timesheetFilter: [...state.timesheetFilter] };

  const { value, field, index } = action.payload;

  stateCopy.timesheetFilter[index][field] = value;

  if (field === "type") {
    delete stateCopy.timesheetFilter[index].subtype;
    delete stateCopy.timesheetFilter[index].value;
  }

  if (
    stateCopy.timesheetFilter[index].hasOwnProperty("type") &&
    stateCopy.timesheetFilter[index].hasOwnProperty("subtype") &&
    stateCopy.timesheetFilter[index].hasOwnProperty("value")
  ) {
    stateCopy.timesheetFilter[index].active = true;
  } else {
    stateCopy.timesheetFilter[index].active = false;
  }

  return stateCopy;
};

// filterReducer
const reducer = (
  state = { timesheetFilter: [{}], timesheetSort: "" },
  action
) => {
  switch (action.type) {
    // Timesheet Filters
    case "addTimesheetFilter":
      return addTimesheetFilter(state, action);

    case "removeTimesheetFilter":
      return removeTimesheetFilter(state, action);

    case "changeTimesheetFilter":
      return changeTimesheetFilter(state, action);

    case "changeTimesheetSort":
      return {
        ...state,
        timesheetFilter: [...state.timesheetFilter],
        timesheetSort: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;
