import { timeIsDateObj } from './timecardFunctions';
import { calculateShiftHours } from './calculateShiftHours';

export const generateWeeklyOT = (timedata, timesheets, overtimeSchedule) => {
  const currentOTPeriod =
    timeIsDateObj(timedata) &&
    overtimeSchedule.find((el) => {
      return (
        timedata.start.getTime() >= new Date(el.start).getTime() &&
        timedata.start.getTime() <= new Date(el.end).getTime()
      );
    });

  const approvedHoursInOTPeriod = timesheets
    .filter((el) => {
      return (
        timeIsDateObj(el) &&
        el.eeNum === timedata.eeNum &&
        el.start.getTime() >= new Date(currentOTPeriod.start).getTime() &&
        el.start.getTime() <= new Date(currentOTPeriod.end).getTime()
      );
    })
    .reduce((prev, curr) => {
      const otHours = curr.otHours || 0;
      return (prev += (curr.end.getTime() - curr.start.getTime()) / 60 / 60 / 1000 - otHours);
    }, 0);

  if (approvedHoursInOTPeriod > 40) {
    const shiftHours = calculateShiftHours(timedata);
    timedata.otHours = approvedHoursInOTPeriod + shiftHours - 3 - 40;
  }

  return timedata;
};
