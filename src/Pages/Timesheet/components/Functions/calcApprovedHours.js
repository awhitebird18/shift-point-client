const calcApprovedHours = (timesheetData, breaksheetData, dateRange, type) => {
  let approvedHours = timesheetData.reduce((prev, timeCurr) => {
    if (
      !timeCurr.start ||
      !timeCurr.end ||
      Object.prototype.toString.call(timeCurr.start) !== '[object Date]' ||
      Object.prototype.toString.call(timeCurr.end) !== '[object Date]'
    ) {
      return prev;
    }
    const breakDeductions = breaksheetData.reduce((prev, breakCurr) => {
      if (
        breakCurr.timesheet === timeCurr.id &&
        breakCurr.unpaid &&
        Object.prototype.toString.call(breakCurr.start) === '[object Date]' &&
        Object.prototype.toString.call(breakCurr.end) === '[object Date]'
      ) {
        return (prev += (breakCurr.end.getTime() - breakCurr.start.getTime()) / 3600000);
      }
      return prev;
    }, 0);

    if (
      timeCurr.date.getTime() >= dateRange.start.getTime() &&
      timeCurr.date.getTime() <= dateRange.end.getTime() &&
      timeCurr.status === 'approved' &&
      !timeCurr.remove
    ) {
      const hours = (timeCurr.end.getTime() - timeCurr.start.getTime()) / 3600000 - breakDeductions;

      return (prev += hours);
    }

    return prev;
  }, 0);

  // Round Approved Hours to 2 decimals
  if (approvedHours.reg) {
    approvedHours.reg.toFixed(2);
  }

  if (approvedHours.ot) {
    approvedHours.ot.toFixed(2);
  }

  return approvedHours;
};

export default calcApprovedHours;
