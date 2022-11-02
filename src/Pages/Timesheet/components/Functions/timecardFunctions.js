import { v4 as uuidv4 } from "uuid";
import _ from "lodash";
import { timeReg } from "../../functions/constants";

export const updateStatus = (timecard) => {
  const timecardCopy = { ...timecard };

  timecardCopy.unsaved = true;

  if (timecardCopy.status === "approved") {
    if (
      timecardCopy.start &&
      timecardCopy.end &&
      Object.prototype.toString.call(timecardCopy.start) === "[object Date]" &&
      Object.prototype.toString.call(timecardCopy.end) === "[object Date]"
    ) {
      timecardCopy.status = "pending";
    }
  } else if (
    timecardCopy.status === "pending" &&
    Object.prototype.toString.call(timecardCopy.start) === "[object Date]" &&
    Object.prototype.toString.call(timecardCopy.end) === "[object Date]"
  ) {
    timecardCopy.status = "approved";
  }

  return timecardCopy;
};

export const updatePosition = (timeData, value, position, employee) => {
  const primaryEarning = employee.earnings.find((el) => {
    return el.primary;
  });

  const dateFormatted = `${timeData.date.getFullYear()}-${
    timeData.date.getMonth() + 1
  }-${timeData.date.getDate()}`;

  timeData = {
    ...timeData,

    positionId: position.positionId,

    departmentId: timeData.departmentId
      ? timeData.departmentId
      : position.departmentId
      ? position.departmentId
      : "",

    earningId: timeData.earningId
      ? timeData.earningId
      : position.earningId
      ? position.earningId
      : "",

    start:
      timeData.start &&
      Object.prototype.toString.call(timeData.start) !== "[object Date]"
        ? new Date(`${dateFormatted} ${timeData.start}`)
        : timeData.start
        ? timeData.start
        : position.start
        ? new Date(`${dateFormatted} ${position.start}`)
        : "",

    end:
      timeData.end &&
      Object.prototype.toString.call(timeData.end) !== "[object Date]"
        ? new Date(`${dateFormatted} ${timeData.end}`)
        : timeData.end
        ? timeData.end
        : position.end
        ? new Date(`${dateFormatted} ${position.end}`)
        : "",

    rate: timeData.rate
      ? timeData.rate
      : position && position.rate >= 0
      ? position.rate
      : primaryEarning?.rate
      ? primaryEarning.rate
      : "",

    status: "pending",
    unsaved: true,
    premiums: [],
  };

  return timeData;
};

export const updateEarning = (timedata, value) => {
  timedata.unsaved = true;
  timedata.earningId = value;

  return timedata;
};

export const updateTime = (timedata, value, key) => {
  timedata = generateId(timedata);

  if (!timedata.earningId) {
    timedata.earningId = "62083c1bdb60a6e265c7db81";
  }
  timedata.unsaved = true;
  timedata.status = "pending";

  if (timeReg.test(value)) {
    const dateFormatted = `${timedata.date.getFullYear()}-${
      timedata.date.getMonth() + 1
    }-${timedata.date.getDate()}`;

    // Convert to date Obj
    timedata[key] = new Date(`${dateFormatted} ${value}`);
  } else {
    // Else store time as string
    timedata[key] = value;
  }

  return timedata;
};

export const calculateBreakDeduction = (breakdata) => {
  return breakdata.reduce((prev, curr) => {
    if (curr.unpaid && timeIsDateObj(curr)) {
      const hours =
        (curr.end.getTime() - curr.start.getTime()) / 60 / 60 / 1000;
      return (prev += hours);
    }

    return prev;
  }, 0);
};

// Helpers
export const timeIsDateObj = (timedata) => {
  if (
    Object.prototype.toString.call(timedata.start) === "[object Date]" &&
    Object.prototype.toString.call(timedata.end) === "[object Date]"
  ) {
    return true;
  }
  return false;
};

export const generateId = (dataObj) => {
  if (!dataObj.id) {
    return { ...dataObj, id: uuidv4() };
  }
  return dataObj;
};
