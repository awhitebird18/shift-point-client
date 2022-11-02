import { timecardSchema } from "../../pages/Timesheet/data/timecardSchema";

export const fetchTimedata = (dateRange, type, dateRangeHelper, employees) => {
  const url = `${process.env.REACT_APP_BASE_URL}${type}`;

  return (dispatch) => {
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      cors: "no-cors",
      // Set employee here
      body: JSON.stringify({
        from: dateRange.start,
        to: dateRange.end,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const result = data.data.map((el) => {
          const timedata = {
            ...el,
            date: new Date(el.date),
            start: el.start ? new Date(el.start) : "",
            end: el.end ? new Date(el.end) : "",
          };

          if (type === "/timesheet") {
            timedata.premiums =
              el.premiums.length > 0
                ? [
                    ...el.premiums.map((premiumEl) => {
                      return {
                        ...premiumEl,
                        start: new Date(premiumEl.start),
                        end: new Date(premiumEl.end),
                      };
                    }),
                  ]
                : [];
          }

          return timedata;
        });

        result.sort((a, b) => {
          return a.start - b.start;
        });

        employees?.forEach((employee) => {
          dateRangeHelper.forEach((date) => {
            const index = result.findIndex((timedata) => {
              return (
                timedata.date.getTime() === date.getTime() &&
                employee.eeNum === timedata.eeNum
              );
            });

            if (index === -1) {
              result.push({
                ...timecardSchema,
                date,
                eeNum: employee.eeNum,
              });
            }
          });
        });

        dispatch({
          type: "storeTimedata",
          payload: {
            data: result,
            type: type === "/timesheet" ? "timesheet" : "breaksheet",
          },
        });
      });
  };
};

export const fetchData = (datatype) => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BASE_URL}/${datatype}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: "storeData",
          payload: { data: data.data, type: datatype },
        });
      });
  };
};

export const storeTimedata = (timedata, type) => {
  return (dispatch) => {
    dispatch({
      type: "storeTimedata",
      payload: {
        type,
        data: timedata,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: false,
      },
    });
  };
};

export const storeTimecard = (timecard) => {
  return (dispatch) => {
    dispatch({
      type: "storeTimecard",
      payload: {
        timecard,
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

export const removeTimecard = (timecard) => {
  return (dispatch) => {
    dispatch({
      type: "removeTimecard",
      payload: {
        timecard,
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

export const addTimecard = (timecard) => {
  return (dispatch) => {
    dispatch({
      type: "addTimecard",
      payload: {
        timecard,
      },
    });
  };
};

export const togglePremiumModal = (timecardId) => {
  return (dispatch) => {
    dispatch({
      type: "togglePremiumModal",
      payload: {
        id: timecardId,
      },
    });
  };
};

export const toggleExtendedModal = (timecardId) => {
  return (dispatch) => {
    dispatch({
      type: "toggleExtendedModal",
      payload: {
        id: timecardId,
      },
    });
  };
};

export const setTimesheetDate = (date) => {
  return (dispatch) => {
    dispatch({
      type: "setTimesheetDate",
      payload: {
        date,
      },
    });
  };
};

// Filter Action Creators
export const addTimesheetFilter = (index) => {
  return (dispatch) => {
    dispatch({
      type: "addTimesheetFilter",
      payload: {
        index,
      },
    });
  };
};

export const setTimesheetFilter = (filter) => {
  return (dispatch) => {
    dispatch({
      type: "setTimesheetFilter",
      payload: filter,
    });
  };
};

export const removeAllTimesheetFilters = () => {
  return (dispatch) => {
    dispatch({
      type: "removeAllTimesheetFilters",
      payload: null,
    });
  };
};

export const removeTimesheetFilter = (index) => {
  return (dispatch) => {
    dispatch({
      type: "removeTimesheetFilter",
      payload: {
        index,
      },
    });
  };
};

export const changeTimesheetFilter = (value, field, index) => {
  return (dispatch) => {
    dispatch({
      type: "changeTimesheetFilter",
      payload: {
        value,
        field,
        index,
      },
    });
  };
};

export const changeTimesheetSort = (value) => {
  return (dispatch) => {
    dispatch({
      type: "changeTimesheetSort",
      payload: {
        value,
      },
    });
  };
};
