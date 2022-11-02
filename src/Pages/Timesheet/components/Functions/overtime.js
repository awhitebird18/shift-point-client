import { v4 as uuidv4 } from "uuid";
import { timesheetRules } from "../../data/timesheetRules";
import { calculateBreakDeduction } from "./calculateBreakDeduction";

// Calc Daily OT
export const calcDailyOvertime = (
  timesheetData,
  breaksheetData,
  employeeData,
  dateRangeHelper,
  timesheetrules
) => {
  employeeData.forEach((employee) => {
    if (!employee.timesheetrules?.overtimeTemplateId) {
      return;
    }

    // Get all unsaved timesheets for the employee
    const unsavedEntries = timesheetData.some((el) => {
      return el.unsaved && el.eeNum === employee.eeNum;
    });

    // If no unsaved timesheets exist, go onto the next employee
    if (!unsavedEntries) {
      return;
    }

    // Get Daily Overtime Threshold
    const overtimeRules = timesheetrules?.overtime.find(
      (el) => el._id === employee.timesheetrules.overtimeTemplateId
    );

    if (!overtimeRules?.dailyThreshold1) {
      return;
    }

    const { dailyThreshold1, dailyThresholdEarningId1 } = overtimeRules;

    dateRangeHelper.forEach((date) => {
      const timeEntriesForDate = timesheetData.filter((el) => {
        return el.date.getTime() === date.getTime() && !el.remove;
      });

      const unsavedExists = timeEntriesForDate.some((el) => {
        return el.unsaved;
      });

      if (
        !unsavedExists ||
        !timeEntriesForDate ||
        timeEntriesForDate.length === 0
      ) {
        return;
      }

      timeEntriesForDate.sort((a, b) => {
        return a.start - b.start;
      });

      let cumulativeHours = 0;
      let totalBreaks = 0;
      const newTimesheetsArr = [];

      for (let i = 0; i < timeEntriesForDate.length; i++) {
        if (
          !timeEntriesForDate[i].start ||
          !timeEntriesForDate[i].end ||
          timeEntriesForDate[i].end === "" ||
          timeEntriesForDate[i].start === ""
        ) {
          newTimesheetsArr.push(timeEntriesForDate[i]);
          continue;
        }

        const breakDeductions = calculateBreakDeduction(
          timeEntriesForDate[i],
          breaksheetData
        );

        totalBreaks += breakDeductions;

        const shiftHours =
          (timeEntriesForDate[i].end.getTime() -
            timeEntriesForDate[i].start.getTime()) /
            3600000 -
          breakDeductions;

        // Add to cumulator. This is the shift hours minus breaks.
        cumulativeHours += shiftHours;

        // If there is only one timesheet and no overtime. Short Curcuit
        if (cumulativeHours <= dailyThreshold1) {
          newTimesheetsArr.push({
            ...timeEntriesForDate[i],
            earningId:
              timeEntriesForDate[i].earningId === "620846ed5924b9cab21c6c48"
                ? employee.earnings.find((el) => {
                    return el.primary;
                  }).earningId
                : timeEntriesForDate[i].earningId,
          });
          continue;
        }

        // Come back to!
        // If we made it here, there is daily overtime to be generated. Strange that totalBreaks are being added to dailyThreshold1?
        const overtimeStart = new Date(
          timeEntriesForDate[i].end.getTime() -
            (cumulativeHours - (dailyThreshold1 + totalBreaks)) * 3600000
        );

        const overtimeHours = cumulativeHours - dailyThreshold1;

        // If shift starts right on the overtime start. Mark all hours as overtime for this line.

        if (overtimeStart.getTime() === timeEntriesForDate[i].start.getTime()) {
          newTimesheetsArr.push({
            ...timeEntriesForDate[i],
            earningId: dailyThresholdEarningId1,
          });
          continue;
        }

        // If overtime falls in the middle of a timecard, break it into two.
        if (overtimeHours > 0 && overtimeHours < shiftHours) {
          const newId = uuidv4();

          // This needs to be changed to filter as there may be more than one break that falls in the overtime line. Its fine for now.
          const breakToEdit = breaksheetData.find((breakEl) => {
            return (
              breakEl.timesheet === timeEntriesForDate[i].id &&
              breakEl.start.getTime() >=
                new Date(
                  timeEntriesForDate[i].end.getTime() -
                    overtimeHours * 60 * 60 * 1000
                )
            );
          });

          if (breakToEdit) {
            breakToEdit.timesheet = newId;
          }

          let breakAdjust = 0;

          if (breakToEdit && breakToEdit.unpaid === true) {
            breakAdjust =
              (breakToEdit.end.getTime() - breakToEdit.start.getTime()) /
              60 /
              60 /
              1000;
          }

          newTimesheetsArr.push({
            ...timeEntriesForDate[i],
            end: new Date(
              timeEntriesForDate[i].end.getTime() -
                (overtimeHours + breakAdjust) * 60 * 60 * 1000
            ),
          });

          timeEntriesForDate.splice(i + 1, 0, {
            ...timeEntriesForDate[i],
            id: newId,
            earningId: dailyThresholdEarningId1,
            start: new Date(
              timeEntriesForDate[i].end.getTime() -
                (overtimeHours + breakAdjust) * 60 * 60 * 1000
            ),
          });

          continue;
        } else {
          newTimesheetsArr.push({
            ...timeEntriesForDate[i],
            earningId: dailyThresholdEarningId1,
          });
          continue;
        }
      }

      timesheetData = [
        ...timesheetData.filter((el) => {
          return el.date.getTime() !== date.getTime();
        }),
        ...newTimesheetsArr,
      ];
    });
  });

  return timesheetData;
};

// Calc Weekly OT
export const calcPeriodOvertime = (
  timesheetData,
  breaksheetData,
  employeeData,
  dateRange,
  overtimeSchedules
) => {
  const unsavedRecords = timesheetData.filter((el) => {
    return el.unsaved;
  });

  if (unsavedRecords.length === 0) {
    return;
  }

  for (let i = 0; i <= unsavedRecords.length - 1; i++) {
    if (unsavedRecords.length === 0) {
      return;
    }

    const overtimePeriod = overtimeSchedules.find((scheduleEl) => {
      return (
        unsavedRecords[i].start.getTime() >= scheduleEl.start.getTime() &&
        unsavedRecords[i].start.getTime() <= scheduleEl.end.getTime()
      );
    });

    unsavedRecords.forEach((el, index) => {
      if (
        el.eeNum === unsavedRecords[i].eeNum &&
        el.start.getTime() >= overtimePeriod.start.getTime() &&
        el.start.getTime() <= overtimePeriod.end.getTime() &&
        el.id !== unsavedRecords[i].id
      ) {
        unsavedRecords.splice(index, 1);
      }
    });

    const timesheetsForRange = timesheetData.filter((el) => {
      return (
        el.start.getTime() >= overtimePeriod.start.getTime() &&
        el.start.getTime() <= overtimePeriod.end.getTime() &&
        el.eeNum === unsavedRecords[i].eeNum
      );
    });
  }

  unsavedRecords.forEach((unsavedEl, index, array) => {});

  return;

  employeeData.forEach((employee) => {
    const timesheets = timesheetData.filter((el) => {
      return (
        el.eeNum === employee.eeNum &&
        el.date.getTime() >= dateRange.start.getTime() &&
        el.date.getTime() <= dateRange.end.getTime() &&
        el.earning === "62083c1bdb60a6e265c7db81"
      );
    });

    if (timesheets.length === 0) return;

    timesheets.sort((a, b) => {
      return a.start - b.start;
    });

    let cumulativeHours = 0;
    let totalBreaks = 0;
    let lastHours = 0;

    for (let i = 0; i < timesheets.length; i++) {
      if (
        !timesheets[i].start ||
        !timesheets[i].end ||
        timesheets[i].end === "" ||
        timesheets[i].start === ""
      ) {
        continue;
      }
      const breakDeductions = breaksheetData.reduce((prev, curr) => {
        if (curr.timesheet === timesheets[i].id && curr.unpaid) {
          return (prev +=
            (curr.end.getTime() - curr.start.getTime()) / 3600000);
        }
        return prev;
      }, 0);

      totalBreaks += breakDeductions;

      // Add to cumulator. This is the shift hours minus breaks.

      if (timesheets[i].earning === 1) {
        cumulativeHours +=
          (timesheets[i].end.getTime() - timesheets[i].start.getTime()) /
            3600000 -
          breakDeductions;
      }

      // Pull up employee and find their Overtime rules
      const employee = employeeData.find((el) => {
        return el.eeNum === timesheets[i].eeNum;
      });

      const { weekly: weeklyOvertime } = timesheetRules.overtime.find((el) => {
        return el.province === employee.province;
      });

      const regHours = weeklyOvertime - lastHours;
      const overtimeStart = new Date(
        timesheets[i].start.getTime() + (regHours + breakDeductions) * 3600000
      );

      if (
        cumulativeHours > weeklyOvertime &&
        overtimeStart.getTime() >= timesheets[i].end.getTime()
      ) {
        timesheets[i].earning = 2;
        // setTimesheetData((prev) => {
        //   return [
        //     ...prev.filter((el) => {
        //       return el.date.getTime() !== timesheets[i].date.getTime();
        //     }),
        //     timesheets[i],
        //   ];
        // });

        timesheetData = [
          ...timesheetData.filter((el) => {
            return el.date.getTime() !== timesheets[i].date.getTime();
          }),
          timesheets[i],
        ];
      } else if (
        cumulativeHours > weeklyOvertime &&
        overtimeStart.getTime() >= timesheets[i].start.getTime() &&
        overtimeStart.getTime() <= timesheets[i].end.getTime()
      ) {
        const firstEntry = { ...timesheets[i], end: overtimeStart };
        const secondEntry = {
          ...timesheets[i],
          start: overtimeStart,
          earning: 2,
          id: uuidv4(),
        };

        timesheetData = [
          ...timesheetData.filter((el) => {
            return el.date.getTime() !== timesheets[i].date.getTime();
          }),
          firstEntry,
          secondEntry,
        ];
      }

      if (timesheets[i].earning === 1) {
        lastHours +=
          (timesheets[i].end.getTime() - timesheets[i].start.getTime()) /
            3600000 -
          breakDeductions;
      }
    }
  });

  return timesheetData;
};
