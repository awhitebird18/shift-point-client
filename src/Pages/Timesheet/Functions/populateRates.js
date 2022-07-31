export const populateRate = (timesheet, employeedata, earningCodes) => {
  const timesheetCopy = [...timesheet];

  timesheetCopy.forEach((el) => {
    if (!el.unsaved) {
      return;
    }

    const earningFound = earningCodes.find((earning) => {
      return earning._id === el.earningId;
    });

    if (typeof el.rate !== 'number' && !el.rate) {
      const employee = employeedata.find((employee) => {
        return employee.eeNum === el.eeNum;
      });

      const primaryEarning = employee.earnings.find((el) => {
        return el.primary;
      });

      const rate = primaryEarning ? primaryEarning.rate : '';

      el.rate = rate;
    } else if (el.rate < earningFound.minRate) {
      el.rate = earningFound.minRate;
    } else if (el.rate > earningFound.maxRate) {
      // Create a warnings array.
      el.rate = earningFound.maxRate;
    }
  });

  return timesheetCopy;
};
