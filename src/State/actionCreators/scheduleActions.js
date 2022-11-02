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

    console.log(data);

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
