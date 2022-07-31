import _ from "lodash";
import { addTimesheetFilter } from "../actionCreators";

// Timesheet
const addTimecard = (state, action) => {
  const { timecard } = action.payload;

  const newTimecard = {
    ...timecard,
    start: timecard.end ? timecard.end : "",
    hours: "",
    end: "",
    status: "pending",
  };

  const timesheetCopy = _.cloneDeep(state.timesheet);

  timesheetCopy.push(newTimecard);

  const newState = { breaksheet: state.breaksheet, timesheet: timesheetCopy };

  return newState;
};

const removeTimecard = (state, action) => {
  const timecard = action.payload.timecard;

  const stateCopy = _.cloneDeep(state);

  const timecardFound = stateCopy.timesheet.find((el) => el.id === timecard.id);
  timecardFound.remove = !timecardFound.remove;

  const breaksheet = stateCopy.breaksheet.map((el) => {
    if (el.timesheet === timecard.id) {
      el.remove = !el.remove;
    }

    return el;
  });

  return {
    ...state,
    timesheet: [...stateCopy.timesheet],
    breaksheet: breaksheet,
  };
};

const storeTimecard = (state, action) => {
  const timecard = action.payload.timecard;

  const stateCopy = {
    ...state,
    timesheet: [...state.timesheet],
    breaksheet: [...state.breaksheet],
  };

  let index = state.timesheet.findIndex((el) => {
    return el.id === timecard.id;
  });

  if (index === -1) {
    index = state.timesheet.findIndex((el) => {
      return (
        el.eeNum === timecard.eeNum &&
        el.date.getTime() === timecard.date.getTime()
      );
    });
  }

  stateCopy.timesheet.splice(index, 1, timecard);

  return stateCopy;
};

// Breaksheet
const storeBreakdata = (state, action) => {
  const { updatedBreakdata, updatedTimedata } = action.payload;

  const breakdataStateCopy = _.cloneDeep(state.breaksheet).filter((el) => {
    return el.timesheet !== updatedTimedata.id;
  });

  // Likely not neccessary to search for existing break records as breaks for this timecard will be filtered out and simply replaced with updated breaks
  updatedBreakdata.forEach((breakEl) => {
    const index = breakdataStateCopy.findIndex((storedBreakEl) => {
      return breakEl.id === storedBreakEl.id;
    });

    if (index === -1) {
      breakdataStateCopy.push(breakEl);
    } else {
      breakdataStateCopy.splice(index, 1, breakEl);
    }
  });

  return { ...state, breaksheet: breakdataStateCopy };
};

const updateBreakField = (state, action) => {
  const { value, key, breaksheet } = action.payload;

  const stateCopy = {
    timesheet: [...state.timesheet],
    breaksheet: [...state.breaksheet],
  };

  let storedBreaksheetIndex = stateCopy.breaksheet.findIndex((el) => {
    return el.id === breaksheet.id;
  });

  if (storedBreaksheetIndex === -1) {
    let storedBreaksheet = { ...breaksheet, [key]: value };

    stateCopy.breaksheet.push(storedBreaksheet);

    return stateCopy;
  }

  const breaksheetCopy = { ...breaksheet, [key]: value };

  stateCopy.breaksheet.splice(storedBreaksheetIndex, 1, breaksheetCopy);

  return stateCopy;
};

const updateBreakStatus = (state, action) => {
  const { value, breaksheet } = action.payload;

  const stateCopy = {
    timesheet: [...state.timesheet],
    breaksheet: [...state.breaksheet],
  };

  const storedBreaksheet = stateCopy.breaksheet.find((el) => {
    return el.id === breaksheet.id;
  });

  if (!storedBreaksheet) {
    return state;
  }

  storedBreaksheet.status = value ? "approved" : storedBreaksheet.status;

  if (storedBreaksheet.status === "approved") {
    if (
      storedBreaksheet.start &&
      storedBreaksheet.end &&
      Object.prototype.toString.call(storedBreaksheet.start) ===
        "[object Date]" &&
      Object.prototype.toString.call(storedBreaksheet.end) === "[object Date]"
    ) {
      storedBreaksheet.status = "pending";
    } else if (
      storedBreaksheet.start &&
      Object.prototype.toString.call(storedBreaksheet.start) === "[object Date]"
    ) {
      storedBreaksheet.status = "working";
    }
  } else if (
    storedBreaksheet.status === "pending" &&
    Object.prototype.toString.call(storedBreaksheet.start) ===
      "[object Date]" &&
    Object.prototype.toString.call(storedBreaksheet.end) === "[object Date]"
  ) {
    storedBreaksheet.status = "approved";
  }

  return stateCopy;
};

const removeBreak = (state, action) => {
  const { id } = action.payload;

  const stateCopy = {
    timesheet: [...state.timesheet],
    breaksheet: [...state.breaksheet],
  };

  const storedBreaksheet = stateCopy.breaksheet.find((el) => {
    return el.id === id;
  });

  if (!storedBreaksheet) {
    return state;
  }

  storedBreaksheet.remove = true;

  return stateCopy;
};

const updateBreakTime = (state, action) => {
  const { value, key, breaksheet } = action.payload;

  const stateCopy = {
    timesheet: [...state.timesheet],
    breaksheet: [...state.breaksheet],
  };

  let storedBreaksheetIndex = stateCopy.breaksheet.findIndex((el) => {
    return el.id === breaksheet.id;
  });

  if (storedBreaksheetIndex === -1) {
    return state;
  }

  const storedBreakCopy = { ...breaksheet };

  const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;

  if (timeReg.test(value)) {
    const dateFormatted = `${storedBreakCopy.date.getFullYear()}-${
      storedBreakCopy.date.getMonth() + 1
    }-${storedBreakCopy.date.getDate()}`;

    storedBreakCopy[key] = new Date(`${dateFormatted} ${value}`);
  } else {
    storedBreakCopy[key] = value;
  }

  if (storedBreakCopy.status === "" || !storedBreakCopy.status) {
    storedBreakCopy.status = "pending";
  }

  stateCopy.breaksheet.splice(storedBreaksheetIndex, 1, storedBreakCopy);

  return stateCopy;
};

const updatePremiumTime = (state, action) => {
  const { value, key, premium, timedata } = action.payload;

  const stateCopy = {
    timesheet: [...state.timesheet],
    breaksheet: [...state.breaksheet],
  };

  let storedTimesheetIndex = stateCopy.timesheet.findIndex((el) => {
    return el.id === timedata.id;
  });

  if (storedTimesheetIndex === -1) {
    return state;
  }

  const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;

  if (timeReg.test(value)) {
    const dateFormatted = `${timedata.date.getFullYear()}-${
      timedata.date.getMonth() + 1
    }-${timedata.date.getDate()}`;

    premium[key] = new Date(`${dateFormatted} ${value}`);
  } else {
    premium[key] = value;
  }

  if (premium.status === "" || !premium.status) {
    premium.status = "pending";
  }

  const storedPremiumIndex = timedata.premiums.findIndex((premiumEl) => {
    return premiumEl.id === premium.id;
  });

  if (storedPremiumIndex === -1) {
    timedata.premiums.push(premium);
  } else {
    timedata.premiums.splice(storedPremiumIndex, 1, premium);
  }

  stateCopy.timesheet.splice(storedTimesheetIndex, 1, timedata);

  return stateCopy;
};

const updatePremiumField = (state, action) => {
  const { value, key, premiumData, timedata } = action.payload;

  const stateCopy = {
    timesheet: [...state.timesheet],
    breaksheet: [...state.breaksheet],
  };

  let storedTimesheetIndex = stateCopy.timesheet.findIndex((el) => {
    return el.id === timedata.id;
  });

  if (storedTimesheetIndex === -1) {
    return state;
  }

  const premium = timedata.premiums.find((premiumEl) => {
    return premiumEl.id === premiumData.id;
  });

  if (!premium) {
    return state;
  }

  premium[key] = value;

  stateCopy.timesheet.splice(storedTimesheetIndex, 1, timedata);

  return stateCopy;
};

// Timesheet Reducer
const reducer = (
  state = { breaksheet: [], timesheet: [], timesheetrules: {}, filters: [] },
  action
) => {
  switch (action.type) {
    // Timesheet Reducers
    case "storeTimedata":
      return { ...state, [action.payload.type]: action.payload.data };

    case "storeData":
      return { ...state, [action.payload.type]: action.payload.data };

    case "storeTimecard":
      return storeTimecard(state, action);

    case "removeTimecard":
      return removeTimecard(state, action);

    case "addTimecard":
      return addTimecard(state, action);

    // Breaksheet Reducers
    case "storeBreakdata":
      return storeBreakdata(state, action);

    case "updateBreakField":
      return updateBreakField(state, action);

    case "updateBreakStatus":
      return updateBreakStatus(state, action);

    case "removeBreak":
      return removeBreak(state, action);

    case "updateBreakTime":
      return updateBreakTime(state, action);

    case "updatePremiumTime":
      return updatePremiumTime(state, action);

    case "updatePremiumField":
      return updatePremiumField(state, action);

    default:
      return state;
  }
};

export default reducer;
