import _ from "lodash";
import { timecardSchema } from "../../Schemas/timecardSchema";
import dayjs from "dayjs";
import axios from "axios";

const convertTimeStringToObj = (timeString, dateObj) => {
  const convertTimeStringToParts = (timeString) => {
    const timeStringParts = timeString.split(" ");

    let hours = +timeStringParts[0].substring(0, 2);
    const minutes = +timeStringParts[0].slice(-2);

    const amPm = timeStringParts[1].toLowerCase();

    if (amPm === "pm") {
      hours += 12;
    }

    return { hours, minutes };
  };

  const { hours, minutes } = convertTimeStringToParts(timeString);

  return dateObj.hour(hours).minute(minutes);
};

// Timesheet Actions
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

// UI Actions
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

// UI Action Creators
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

export const setIsLoading = (value) => {
  return async (dispatch) => [
    dispatch({
      type: "setIsLoading",
      payload: {
        isLoading: value,
      },
    }),
  ];
};

export const displayErrorMessage = (errorTitle, errorMessage) => {
  return (dispatch) => {
    dispatch({
      type: "displayErrorMessage",
      payload: {
        errorTitle,
        errorMessage,
      },
    });
  };
};

export const showModal = (modalProps) => {
  return (dispatch) => {
    dispatch({
      type: "SHOW_MODAL",
      payload: modalProps,
    });
  };
};

export const setNotification = (notification) => {
  return (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification,
    });
  };
};

// Error Action Creators
export const setStatusError = (status, title, subTitle) => {
  return (dispatch) => {
    dispatch({
      type: "setStatusError",
      payload: {
        status,
        title,
        subTitle,
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

// Schedule actions
export const fetchSchedules = () => {
  return async (dispatch) => {
    const { data } = await axios.get("schedule");

    const schedules = data?.data.map((el) => {
      if (el.publishedTo) {
        el.publishedTo = dayjs(el.publishedTo);
      }

      return el;
    });

    schedules.length === 1 ? (schedules[0].current = true) : "";

    dispatch({
      type: "STORE_SCHEDULES",
      payload: data.data,
    });
  };
};

export const fetchShifts = (startDate, endDate) => {
  return async (dispatch) => {
    const startFormatted = dayjs(startDate).format("YYYY-MM-DD");

    const { data } = await axios.get(`shift?startDate=${startFormatted}`);

    const dataFormatted = data.data.map((el) => {
      return {
        ...el,
        date: dayjs(el.date),
        start: dayjs(el.start),
        end: dayjs(el.end),
      };
    });

    dispatch({
      type: "STORE_SHIFTS",
      payload: dataFormatted,
    });
  };
};

export const setCurrentSchedule = (scheduleId) => {
  return (dispatch) => {
    dispatch({
      type: "SET_CURRENT_SCHEDULE",
      payload: scheduleId,
    });
  };
};

export const addNewShift = (shift) => {
  if (typeof shift.start === "string") {
    shift.start = convertTimeStringToObj(shift.start, shift.date);
    shift.end = convertTimeStringToObj(shift.end, shift.date);
  }

  return async (dispatch) => {
    const { data } = await axios.post("shift", shift);

    const newShift = data.data;
    newShift.date = dayjs(newShift.date);
    newShift.start = dayjs(newShift.start);
    newShift.end = dayjs(newShift.end);

    dispatch({
      type: "ADD_NEW_SHIFT",
      payload: newShift,
    });
  };
};

export const editShift = (shift) => {
  return async (dispatch) => {
    const { data } = await axios.patch(`shift/${shift._id}`, shift);

    const updatedShift = data.data;

    updatedShift.date = dayjs(updatedShift.date);
    updatedShift.start = dayjs(updatedShift.start);
    updatedShift.end = dayjs(updatedShift.end);

    dispatch({
      type: "EDIT_SHIFT",
      payload: updatedShift,
    });
  };
};

export const deleteShift = (shiftId) => {
  return async (dispatch) => {
    await axios.delete(`shift/${shiftId}`);

    dispatch({
      type: "DELETE_SHIFT",
      payload: shiftId,
    });
  };
};

export const setCurrentWeek = (startDate) => {
  return async (dispatch) => {
    dispatch({
      type: "setIsLoading",
      payload: {
        isLoading: true,
      },
    });

    const { data } = await axios.get(
      `shift?startDate=${startDate.format("YYYY-MM-DD")}`
    );

    const dataFormatted = data.data.map((el) => {
      return {
        ...el,
        date: dayjs(el.date),
        start: dayjs(el.start),
        end: dayjs(el.end),
      };
    });

    dispatch({
      type: "SET_CURRENT_WEEK",
      payload: {
        currentWeek: startDate,
        shifts: dataFormatted,
      },
    });

    dispatch({
      type: "setIsLoading",
      payload: {
        isLoading: false,
      },
    });
  };
};

export const createSchedule = (name) => {
  return async (dispatch) => {
    const { data } = await axios.post("schedule", { name });

    dispatch({
      type: "ADD_NEW_SCHEDULE",
      payload: data.data,
    });
  };
};

export const updateSchedule = (schedule) => {
  return async (dispatch) => {
    const { data } = await axios.patch(`schedule/${schedule._id}`, schedule);

    const updatedSchedule = data.data;

    if (updatedSchedule.publishedTo)
      updatedSchedule.publishedTo = dayjs(updatedSchedule.publishedTo);

    dispatch({
      type: "UPDATE_SCHEDULE",
      payload: updatedSchedule,
    });
  };
};

// USER INTERACTION
export const addKeypress = (key) => {
  return (dispatch) => {
    dispatch({
      type: "ADD_KEYPRESS",
      payload: key,
    });
  };
};

export const removeKeypress = (key) => {
  return (dispatch) => {
    dispatch({
      type: "REMOVE_KEYPRESS",
      payload: key,
    });
  };
};

// Notifications
export const markAllAsRead = (notifications) => {
  return async (dispatch) => {
    const unviewedNotifications = notifications.filter((notification) => {
      return notification.unread;
    });

    if (unviewedNotifications.length === 0) return;

    const notificationIdArr = unviewedNotifications.map((notification) => {
      return `id=${notification._id}`;
    });

    const queryString = notificationIdArr.join("&");

    await fetch(
      `${process.env.REACT_APP_BASE_URL}/notification?${queryString}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch({
          type: "MARK_AS_READ",
          payload: notificationIdArr,
        });
      });
  };
};

export const toggleRead = (notification) => {
  return async (dispatch) => {
    await fetch(
      `${process.env.REACT_APP_BASE_URL}/notification/${
        notification._id
      }?unread=${!notification.unread}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",
      }
    ).then((res) => {
      dispatch({
        type: "TOGGLE_READ",
        payload: notification._id,
      });
    });
  };
};

export const fetchNotifications = () => {
  return async (dispatch) => {
    const { data } = await axios.get("/notification");

    if (!data) return;

    const notifications = data.data.map((el) => {
      return { ...el, time: dayjs(el.time) };
    });

    dispatch({
      type: "STORE_NOTIFICATIONS",
      payload: notifications,
    });
  };
};

// Employees
export const fetchEmployees = () => {
  return async (dispatch) => {
    const { data } = await axios.get("employee");

    dispatch({
      type: "STORE_EMPLOYEES",
      payload: data.data,
    });
  };
};

// Payroll

export const fetchData2 = (type) => {
  return async (dispatch) => {
    const { data } = await axios.get(type);

    dispatch({
      type: "STORE_DATA2",
      payload: {
        type: type,
        data: data.data,
      },
    });
  };
};

export const setCurrentUser = () => {
  return async (dispatch) => {
    const { data } = await axios.get("userAccounts/currentuser");

    document.documentElement.style.setProperty(
      "--color-primary",
      data.data.preferences.colorCode
    );

    dispatch({
      type: "STORE_CURRENT_USER",
      payload: data.data,
    });
  };
};
