import { calculateBreakDeduction } from './calculateBreakDeduction';
import { calculateShiftHours } from './calculateShiftHours';

export const generateDailyOT = (timedata, breakdata, timesheetrules, employee, earningCodes) => {
  const overtimeRule = timesheetrules.overtime.find((el) => {
    return el._id === employee.timesheetrules.overtimeTemplateId;
  });

  if (!overtimeRule || overtimeRule.dailyThreshold1) {
    return timedata;
  }

  const earningCode = earningCodes.find((el) => {
    return el._id === timedata.earningId;
  });

  const dailyOTThreshold = overtimeRule.dailyThreshold1;

  const breakDeductions = calculateBreakDeduction(timedata, breakdata);

  const shiftHours = calculateShiftHours(timedata) - breakDeductions;

  if (shiftHours <= dailyOTThreshold) {
    return timedata;
  }

  // timedata.otHours =
  //   timedata.earningId === '62083c1bdb60a6e265c7db81' && shiftHours - dailyOTThreshold;

  // return timedata;
};
