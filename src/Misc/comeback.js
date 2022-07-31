// If everything in the current timesheet is equal to the last timesheet (earning, position, department), consolidate the two into one.
if (
  timesheets[i - 1] &&
  timesheets[i].start.getTime() === timesheets[i - 1].end.getTime() &&
  timesheets[i - 1].position === timesheets[i].position &&
  timesheets[i - 1].earning === 2 &&
  timesheets[i].earning === 2 &&
  timesheets[i - 1].department === timesheets[i].department
) {
  setBreaksheetData((prev) => {
    const breaksheets = prev
      .filter((el) => {
        return el.timesheet === timesheets[i].id;
      })
      .map((el) => {
        return { ...el, timesheet: timesheets[i - 1].id };
      });

    return [
      ...prev.filter((el) => {
        return el.timesheet !== timesheets[i].id;
      }),
      ...breaksheets,
    ];
  });

  timesheets[i] = { ...newTimesheetsArr.pop(), end: timesheets[i].end };
}


allShifts.forEach((shift) => {
  let shiftStart = shift[0].start;
  let shiftEnd = shift[shift.length - 1].end;

  timesheetRules.breaks.forEach((breakRuleEl) => {
    // Generate when the break will start/end
    const breakStart = new Date(breakRuleEl.start * 3600000 + shiftStart.getTime());
    const breakEnd = new Date(
      (breakRuleEl.start + breakRuleEl.hours) * 3600000 + shiftStart.getTime()
    );

    // If auto break is not present in allbreaks, add it
    shift.forEach((timeEntry, index) => {
      let breakIndex = breakEntries.findIndex((el) => {
        return breakRuleEl.breakTypeId === el.breakTypeId && el.timesheet === timeEntry.id;
      });

      if (
        breakIndex !== -1 &&
        (breakEntries[breakIndex].start.getTime() < timeEntry.start.getTime() ||
          breakEntries[breakIndex].end.getTime() > timeEntry.end.getTime())
      ) {
        breakEntries[breakIndex].remove = true;
        return;
      } else if (
        breakIndex !== -1 &&
        !timeEntry.remove &&
        breakEntries[breakIndex].start.getTime() >= timeEntry.start.getTime() &&
        breakEntries[breakIndex].end.getTime() <= timeEntry.end.getTime()
      ) {
        breakEntries[breakIndex].remove = false;
        return;
      }

      if (breakIndex !== -1) {
        return;
      }

      if (
        index > 0 &&
        breakStart.getTime() <= timeEntry.start.getTime() &&
        breakEnd.getTime() >= timeEntry.start.getTime()
      ) {
        breakEntries.push({
          ...breakRuleEl,
          start: new Date(breakStart.getTime() + breakRuleEl.hours * 3600000),
          end: new Date(breakEnd.getTime() + breakRuleEl.hours * 3600000),
          timesheet: timeEntry.id,
          date: timeEntry.date,
          remove: false,
          eeNum: timecard.eeNum,
          auto: true,
          id: uuidv4(),
          status: 'approved',
        });
      } else if (
        breakStart.getTime() >= timeEntry.start.getTime() &&
        breakEnd.getTime() <= timeEntry.end.getTime()
      ) {
        breakEntries.push({
          ...breakRuleEl,
          start: new Date(breakStart.getTime() + breakRuleEl.hours * 3600000),
          end: new Date(breakEnd.getTime() + breakRuleEl.hours * 3600000),
          timesheet: timeEntry.id,
          date: timeEntry.date,
          remove: false,
          eeNum: timecard.eeNum,
          auto: true,
          id: uuidv4(),
          status: 'approved',
        });
      }
    });



    
  dateRangeHelper.forEach((date) => {
    let timesheets = timesheetData.filter((timecard) => {
      return timecard.date.getTime() === date.getTime();
    });

    if (timesheets.length === 0) return;

    timesheets.sort((a, b) => {
      return a.start - b.start;
    });

    // Setting cumulator to find when OT is occuring.
    let cumulativeHours = 0;
    let totalBreaks = 0;
    // Push all timesheets for new timesheets.
    const newTimesheetsArr = [];

    for (let i = 0; i < timesheets.length; i++) {
      if (
        !timesheets[i].start ||
        !timesheets[i].end ||
        timesheets[i].end === '' ||
        timesheets[i].start === ''
      ) {
        newTimesheetsArr.push(timesheets[i]);
        continue;
      }
      // Calc break unpaid deductions for timesheets[i]
      const breakDeductions = breaksheetData.reduce((prev, curr) => {
        if (
          curr.timesheet === timesheets[i].id &&
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

      totalBreaks += breakDeductions;

      // Add to cumulator. This is the shift hours minus breaks.
      cumulativeHours +=
        (timesheets[i].end.getTime() - timesheets[i].start.getTime()) / 3600000 - totalBreaks;

      // Pull up employee and find their Overtime rules
      const employee = employeeData.find((el) => {
        return el.eeNum === timesheets[i].eeNum;
      });

      const { daily: dailyOvertime } = timesheetRules.overtime.find((el) => {
        return el.province === 'Manitoba';
      });

      // If everything in the current timesheet is equal to the last timesheet (earning, position, department), consolidate the two into one.
      if (
        timesheets[i - 1] &&
        timesheets[i - 1].start &&
        timesheets[i - 1].end &&
        timesheets[i].start.getTime() === timesheets[i - 1].end.getTime() &&
        timesheets[i - 1].position === timesheets[i].position &&
        timesheets[i - 1].department === timesheets[i].department &&
        timesheets[i - 1].earningId === '62083c1bdb60a6e265c7db81' &&
        timesheets[i].earningId == '620846ed5924b9cab21c6c48'
      ) {
        timesheets[i] = { ...newTimesheetsArr.pop(), end: timesheets[i].end };
      }

      // If there is only one timesheet and no overtime. Short Curcuit
      if (cumulativeHours <= dailyOvertime) {
        newTimesheetsArr.push({ ...timesheets[i], earningId: '62083c1bdb60a6e265c7db81' });
        continue;
      }

      // If we made it here, there is daily overtime.
      const overtimeStart = new Date(
        timesheets[0].start.getTime() + (dailyOvertime + totalBreaks) * 3600000
      );

      // Everything that was OT previously OT will start OT
      if (overtimeStart.getTime() === timesheets[i].start.getTime()) {
        newTimesheetsArr.push({ ...timesheets[i] });
        continue;
      }

      if (
        overtimeStart.getTime() > timesheets[i].start.getTime() &&
        overtimeStart.getTime() < timesheets[i].end.getTime()
      ) {
        newTimesheetsArr.push({ ...timesheets[i], end: overtimeStart });

        timesheets.splice(i + 1, 0, {
          ...timesheets[i],
          id: uuidv4(),
          earningId: '620846ed5924b9cab21c6c48',
          start: overtimeStart,
          end: timesheets[i].end,
        });
        continue;
      } else if (
        overtimeStart.getTime() > timesheets[i].start.getTime &&
        overtimeStart.getTime() < timesheets[i].end.getTime
      ) {
        newTimesheetsArr.push({ ...timesheets[i], end: overtimeStart });
        continue;
      } else {
        newTimesheetsArr.push({
          ...timesheets[i],
          earningId: '620846ed5924b9cab21c6c48',
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

  return timesheetData;