export const calculateBreakDeduction = (timesheet, breakdata) => {
  const breaks = breakdata.filter((el) => {
    return el.timesheet === timesheet.id && !el.remove;
  });

  const breakDeductions = breaks.reduce((prev, curr) => {
    if (
      curr.unpaid &&
      curr.end &&
      curr.start &&
      Object.prototype.toString.call(curr.end) === '[object Date]' &&
      Object.prototype.toString.call(curr.start) === '[object Date]'
    ) {
      return (prev += (curr.end.getTime() - curr.start.getTime()) / 3600000);
    }
    return prev;
  }, 0);

  return breakDeductions;
};
