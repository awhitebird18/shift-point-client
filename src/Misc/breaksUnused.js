// Handle Breakchange
function handleBreakChange(e) {
  setBreaksheetData((prev) => {
    const input = e.target;

    const breakIndex = prev.findIndex((el) => {
      return el.id === breaksheetData.id;
    });

    if (breakIndex === -1) {
      prev.push({ ...breaksheetData });

      breakIndex === prev.length - 1;
    }

    //   Handle type, status, and remove fields
    if (e.target.name === 'breakTypeId') {
      prev[breakIndex].breakTypeId = input.value;
    }

    if (e.target.name === 'unpaid') {
      prev[breakIndex].unpaid = input.checked;
    }

    if (e.target.name === 'status') {
      prev[breakIndex].status = e.target.checked ? 'approved' : 'pending';
    }

    const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;

    if ((e.target.name === 'start' || e.target.name === 'end') && timeReg.test(e.target.value)) {
      prev[breakIndex][e.target.name] = new Date(`${dateFormatted} ${input.value}`);
    } else if (e.target.name === 'start' || e.target.name === 'end') {
      prev[breakIndex][e.target.name] = input.value.toString();
    }

    if (
      Object.prototype.toString.call(prev[breakIndex].start) === '[object Date]' &&
      Object.prototype.toString.call(prev[breakIndex].end) === '[object Date]'
    ) {
      prev[breakIndex].hours = (
        (prev[breakIndex].end.getTime() - prev[breakIndex].start.getTime()) /
        3600000
      ).toFixed(2);
    } else {
      prev[breakIndex].hours = '';
    }
    !prev[breakIndex];
    // prev[breakIndex].auto = false;

    if (timesheetData.overtimePosition) {
      prev[breakIndex].breakAdjust = true;
    }

    return [...prev];
  });

  setTriggerBreakAdjust((prev) => !prev);
  setTriggerDailyOT((prev) => !prev);
}
