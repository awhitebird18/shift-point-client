export const positionChange = (timedata, value, position) => {
  const dateFormatted = `${timedata.date.getFullYear()}-${
    timedata.date.getMonth() + 1
  }-${timedata.date.getDate()}`;

  timedata = {
    ...timedata,

    positionId: value,

    departmentId: timedata.departmentId
      ? timedata.departmentId
      : position && position.departmentId
      ? position.departmentId
      : "",

    earningId: timedata.earningId
      ? timedata.earningId
      : position && position.earningId
      ? position.earningId
      : "",

    start:
      timedata.start &&
      Object.prototype.toString.call(timedata.start) !== "[object Date]"
        ? new Date(`${dateFormatted} ${timedata.start}`)
        : timedata.start
        ? timedata.start
        : position && position.start
        ? new Date(`${dateFormatted} ${position.start}`)
        : "",

    end:
      timedata.end &&
      Object.prototype.toString.call(timedata.end) !== "[object Date]"
        ? new Date(`${dateFormatted} ${timedata.end}`)
        : timedata.end
        ? timedata.end
        : position && position.end
        ? new Date(`${dateFormatted} ${position.end}`)
        : "",

    status: "pending",
    unsaved: true,
  };

  return timedata;
};

export const updatePosition = (value, key, timecard, selectedPosition) => {
  return (dispatch) => {
    dispatch({
      type: "updatePosition",
      payload: {
        value,
        key,
        timecard,
        selectedPosition,
      },
    });
    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const updateTimecard = (value, key, timedata) => {
  return (dispatch) => {
    dispatch({
      type: "updateEarning",
      payload: {
        value,
        key,
        timedata,
      },
    });
    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const handleTime = (value, key, timecard) => {
  return (dispatch) => {
    dispatch({
      type: "handleTime",
      payload: {
        value,
        key,
        timecard,
      },
    });
    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const handleStatus = (value, key, timecard) => {
  return (dispatch) => {
    dispatch({
      type: "handleStatus",
      payload: {
        value,
        key,
        timecard,
      },
    });

    dispatch({
      type: "unsavedChanges",
      payload: {
        value: true,
      },
    });
  };
};

export const updateBreaksheet = (breaksheets) => {
  return (dispatch) => {
    dispatch({
      type: "updateBreaksheet",
      payload: breaksheets,
    });
  };
};

export const fetchBreaksheets = (dateRange) => {
  return (dispatch) => {
    fetch("${process.env.REACT_APP_BASE_URL}breaksheet", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      cors: "no-cors",
      // Set employee here
      body: JSON.stringify({
        from: dateRange.start,
        to: dateRange.end,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const result = data.data.map((el) => {
          return {
            ...el,
            date: new Date(el.date),
            start: el.start ? new Date(el.start) : "",
            end: el.end ? new Date(el.end) : "",
          };
        });

        result.sort((a, b) => {
          return a.start - b.start;
        });
        dispatch({
          type: "updateBreaksheet",
          payload: result,
        });
      });
  };
};

export const addBreak = (breaksheet) => {
  return (dispatch) => {
    dispatch({
      type: "addBreak",
      payload: {
        breaksheet,
      },
    });
  };
};

export const updateTimeData = (timecard, value, key) => {
  timecard.unsaved = true;

  const timeReg = /^(1[0-2]|0?[1-9]):[0-5][0-9] (AM|am|PM|pm)$/;

  if (timeReg.test(value)) {
    const dateFormatted = `${timecard.date.getFullYear()}-${
      timecard.date.getMonth() + 1
    }-${timecard.date.getDate()}`;

    timecard[key] = new Date(`${dateFormatted} ${value}`);

    if (!timecard.earningId) {
      timecard.earningId = "62083c1bdb60a6e265c7db81";
    }
  } else {
    timecard[key] = value;
  }

  timecard.status = "pending";

  return timecard;
};

function handleStatus(timecard) {
  const currentTime = new Date(Date.now());
  // Handle Status
  if (
    timecard.status === "working" &&
    Object.prototype.toString.call(timecard.start) === "[object Date]" &&
    Object.prototype.toString.call(timecard.end) === "[object Date]"
  ) {
    timecard.status = "pending";
  } else if (
    timecard.status === "pending" &&
    Object.prototype.toString.call(timecard.start) === "[object Date]" &&
    timecard.end === ""
  ) {
    if (
      currentTime.getTime() >
      timecard.start.getTime() + timesheetRules.shiftLimits.max * 3600000
    ) {
      timecard.status = "pending";
    } else {
      timecard.status = "working";
    }
  } else if (timecard.status === "approved") {
    if (
      currentTime.getTime() >
      timecard.start.getTime() + timesheetRules.shiftLimits.max * 3600000
    ) {
      timecard.status = "pending";
    } else {
      timecard.status = "working";
    }
  }

  timecard.unsaved = true;

  return timecard;
}

export const generateBreaksHelper = (timedata, breakdata) => {
  // If auto break saved to DB with no adjustment, mark as remove.
  const breaksToRemoveFromDB = breakdata
    .filter((el) => {
      return (
        (el.start.getTime() < timedata.start.getTime() ||
          el.end.getTime() > timedata.end.getTime()) &&
        el._id
      );
    })
    .map((el) => {
      return { ...el, remove: true };
    });

  let newBreakEntries = [];

  const allShifts = [];

  let count = 0;

  // Determine Shift Segments.
  timesheetDataCurrentDate.forEach((el, index, array) => {
    if (
      Object.prototype.toString.call(el.start) !== "[object Date]" ||
      Object.prototype.toString.call(el.end) !== "[object Date]"
    ) {
      return;
    }

    while (
      index !== array.length - 1 &&
      typeof array[index + 1].start === "object" &&
      el.end.getTime() === array[index + 1].start.getTime()
    ) {
      count++;
      return;
    }

    allShifts.push(array.slice(index - count, index + 1));
    count = 0;
  });

  //   COME BACK TO MARCH 13
  allShifts.forEach((shift) => {
    let shiftStart = shift[0].start;
    let shiftEnd = shift[shift.length - 1].end;

    shift.forEach((timeEntry) => {
      const breaksForSegment = timesheetRules.breaks
        .filter((breakRuleEl) => {
          // Check to see if break already exists. If so, move on.
          if (existingBreakEntries) {
            const index = existingBreakEntries.findIndex((el) => {
              return el.breakTypeId === breakRuleEl.breakTypeId;
            });

            // New: If break is manually adjusted and now falls outside of the time entry, mark as inactive.
            // If existing break now falls inside of another timecard, change the timesheet property.
            const existingBreaksForTimeEntry = existingBreakEntries.filter(
              (el) => {
                return el.timesheet === timeEntry.id;
              }
            );

            if (existingBreaksForTimeEntry.length > 0) {
              existingBreaksForTimeEntry.forEach((el) => {
                if (
                  el.start.getTime() < timeEntry.start.getTime() ||
                  el.start.getTime() > timeEntry.end.getTime()
                ) {
                  const breakInactive = existingBreakEntries.find((breakEl) => {
                    return breakEl.id === el.id;
                  });

                  breakInactive.inactive = true;
                } else {
                  const breakEntry = existingBreakEntries.find((breakEl) => {
                    return breakEl.id === el.id;
                  });

                  breakEntry.timesheet = timeEntry.id;
                }
              });
            }

            if (index !== -1) {
              return;
            }
          }

          // At this point, the breaktype does not already exist. Check to see if the break falls within the shift segment. If so, return it.
          const breakStart = new Date(
            breakRuleEl.start * 3600000 + shiftStart.getTime()
          );
          const breakEnd = new Date(
            (breakRuleEl.start + breakRuleEl.hours) * 3600000 +
              shiftStart.getTime()
          );

          if (
            breakStart.getTime() > timeEntry.start.getTime() &&
            breakEnd.getTime() < timeEntry.end.getTime()
          ) {
            return breakRuleEl;
          }
        })
        .map((breakRuleEl) => {
          const breakStart = new Date(
            breakRuleEl.start * 3600000 + shiftStart.getTime()
          );
          const breakEnd = new Date(
            (breakRuleEl.start + breakRuleEl.hours) * 3600000 +
              shiftStart.getTime()
          );
          return {
            ...breakRuleEl,
            start: new Date(breakStart.getTime() + breakRuleEl.hours * 3600000),
            end: new Date(breakEnd.getTime() + breakRuleEl.hours * 3600000),
            timesheet: timeEntry.id,
            date: timeEntry.date,
            remove: false,
            eeNum: timeEntry.eeNum,
            auto: true,
            id: uuidv4(),
            status: "approved",
          };
        });

      newBreakEntries.push(...breaksForSegment);
    });
  });

  const breaksheetDateFiltered = breaksheetData.filter((el) => {
    return !(
      el.eeNum === timecard.eeNum &&
      el.date.getTime() === timecard.date.getTime()
    );
  });

  const newTimedata = {
    timesheetData: [...timesheetDataCurrentDate],
    breaksheetData: [
      ...breaksheetDateFiltered,
      ...breaksToRemoveFromDB,
      ...existingBreakEntries,
      ...newBreakEntries,
    ],
  };

  return newTimedata;
};
