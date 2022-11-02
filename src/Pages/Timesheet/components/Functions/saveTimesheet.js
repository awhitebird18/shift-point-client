import { populateRate } from "./populateRates";
import { deleteTimedata } from "./timesheetDb";
import { populatePremiums } from "./populatePremiums";
import { calcDailyOvertime, calcPeriodOvertime } from "./overtime";

export const updateTimedata = async (
  timesheet,
  breaksheet,
  employeeData,
  dateRange,
  earningCodes,
  premiums,
  timesheetrules
) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASE_URL}/overtimeschedule`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  const { data } = await res.json();

  const overtimeSchedules = data.map((el) => {
    return {
      ...el,
      start: new Date(el.start),
      end: new Date(el.end),
    };
  });

  const filteredTimedata = timesheet.filter((timedata) => {
    return timedata.id;
  });

  let updatedTimesheet = populateRate(
    filteredTimedata,
    employeeData,
    earningCodes
  );

  populatePremiums(updatedTimesheet, premiums, earningCodes);

  updatedTimesheet = calcDailyOvertime(
    updatedTimesheet,
    breaksheet,
    employeeData,
    dateRange,
    timesheetrules
  );

  // calcPeriodOvertime(updatedTimesheet, breaksheet, employeeData, dateRange, overtimeSchedules);

  deleteTimedata(updatedTimesheet, "timesheet");

  return updatedTimesheet;
};

export const updateBreakdata = (breaksheet) => {
  deleteTimedata(breaksheet, "breaksheet");

  return breaksheet;
};
