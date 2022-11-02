// Breaksheet Actions
export const storeBreakdata = (updatedBreakdata, updatedTimedata) => {
  return (dispatch) => {
    dispatch({
      type: "storeBreakdata",
      payload: {
        updatedBreakdata,
        updatedTimedata,
      },
    });
  };
};

export const updateBreakField = (value, key, breaksheet, timesheetId) => {
  return (dispatch) => {
    dispatch({
      type: "updateBreakField",
      payload: {
        value,
        key,
        breaksheet,
        timesheetId,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const updateBreakStatus = (value, breaksheet) => {
  return (dispatch) => {
    dispatch({
      type: "updateBreakStatus",
      payload: {
        value,
        breaksheet,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const removeBreak = (id) => {
  return (dispatch) => {
    dispatch({
      type: "removeBreak",
      payload: {
        id,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const updateBreakTime = (value, key, breaksheet) => {
  return (dispatch) => {
    dispatch({
      type: "updateBreakTime",
      payload: {
        value,
        key,
        breaksheet,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const updatePremiumTime = (value, key, premium, timedata) => {
  return (dispatch) => {
    dispatch({
      type: "updatePremiumTime",
      payload: {
        value,
        key,
        premium,
        timedata,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const updatePremiumField = (value, key, premiumData, timedata) => {
  return (dispatch) => {
    dispatch({
      type: "updatePremiumField",
      payload: {
        value,
        key,
        premiumData,
        timedata,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const toggleBreakModal = (timecardId) => {
  return (dispatch) => {
    dispatch({
      type: "toggleBreakModal",
      payload: {
        id: timecardId,
      },
    });
  };
};
