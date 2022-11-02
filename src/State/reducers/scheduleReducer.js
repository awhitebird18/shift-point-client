const initialState = {
  schedules: [],
  currentWeek: null,
  shifts: [],
  isLoading: false,
};

const setCurrentSchedule = (state, action) => {
  const scheduleId = action.payload;

  const stateCopy = {
    schedules: [...state.schedules],
    shifts: [...state.shifts],
  };

  stateCopy.schedules = state.schedules.map((el) => {
    if (el._id === scheduleId) {
      el.current = true;
    } else {
      el.current = false;
    }

    return el;
  });

  return stateCopy;
};

const addNewShift = (state, action) => {
  const shift = action.payload;

  const stateCopy = {
    ...state,
    shifts: [...state.shifts],
  };

  stateCopy.shifts.push(shift);

  return stateCopy;
};

const editShift = (state, action) => {
  const shift = action.payload;
  const stateCopy = {
    ...state,
    schedules: [...state.schedules],
    shifts: [...state.shifts],
    isLoading: false,
  };

  const shiftIndex = stateCopy.shifts.findIndex((el) => {
    return el._id === shift._id;
  });

  stateCopy.shifts.splice(shiftIndex, 1, shift);

  return stateCopy;
};

const deleteShift = (state, action) => {
  const shiftId = action.payload;
  const stateCopy = {
    ...state,
    shifts: [...state.shifts],
  };

  const shiftIndex = stateCopy.shifts.findIndex((el) => {
    return el._id === shiftId;
  });

  stateCopy.shifts.splice(shiftIndex, 1);

  return stateCopy;
};

const udpateSchedule = (state, action) => {
  const stateCopy = { ...state, schedules: [...state.schedules] };

  const index = stateCopy.schedules.findIndex((el) => {
    return el._id === action.payload._id;
  });

  if (index === -1) return state;

  stateCopy.schedules.splice(index, 1, action.payload);

  return stateCopy;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_SCHEDULES":
      return { ...state, schedules: [...action.payload] };

    case "ADD_NEW_SCHEDULE":
      return { ...state, schedules: [...state.schedules, action.payload] };

    case "UPDATE_SCHEDULE":
      return udpateSchedule(state, action);

    case "STORE_SHIFTS":
      return { ...state, shifts: [...action.payload] };

    case "SET_CURRENT_WEEK":
      return {
        ...state,
        currentWeek: action.payload.currentWeek,
        shifts: [...action.payload.shifts],
      };

    case "SET_CURRENT_SCHEDULE":
      return setCurrentSchedule(state, action);

    case "ADD_NEW_SHIFT":
      return addNewShift(state, action);

    case "EDIT_SHIFT":
      return editShift(state, action);

    case "DELETE_SHIFT":
      return deleteShift(state, action);

    default:
      return state;
  }
};

export default reducer;
