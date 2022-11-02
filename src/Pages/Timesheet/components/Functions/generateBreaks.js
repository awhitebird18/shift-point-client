import { v4 as uuidv4 } from "uuid";

// Breaksheet
export const generateBreaks = (
  timedata,
  breakdata,
  timesheetrules,
  employee
) => {
  const breakTemplate = timesheetrules.breakTemplates.find((el) => {
    return el.templateId === employee.timesheetrules.breakTemplateId;
  });

  // Filter out all autos. Then check to see if there are stored breaks in the DB. If they are not longer within the timecard, mark as remove.
  breakdata = breakdata
    .filter((el) => {
      return !el.auto;
    })
    .map((breakEl) => {
      if (
        breakEl._id &&
        (breakEl.start.getTime() < timedata.start.getTime() ||
          breakEl.end.getTime() > timedata.end.getTime())
      ) {
        return { ...breakEl, remove: true };
      } else return breakEl;
    });

  breakTemplate.breaks.forEach((breakRuleEl) => {
    const index = breakdata.findIndex((el) => {
      return el.breakTypeId === breakRuleEl.breakTypeId && !el.remove;
    });

    if (index !== -1) {
      return;
    }

    const breakStart = new Date(
      breakRuleEl.start * 3600000 + timedata.start.getTime()
    );

    const breakEnd = new Date(
      (breakRuleEl.start + breakRuleEl.length / 60) * 3600000 +
        timedata.start.getTime()
    );

    if (
      breakStart.getTime() > timedata.start.getTime() &&
      breakEnd.getTime() < timedata.end.getTime()
    ) {
      breakdata.push({
        ...breakRuleEl,
        start: new Date(
          breakStart.getTime() + (breakRuleEl.length / 60) * 3600000
        ),
        end: new Date(breakEnd.getTime() + (breakRuleEl.length / 60) * 3600000),
        timesheet: timedata.id,
        date: timedata.date,
        remove: false,
        eeNum: timedata.eeNum,
        auto: true,
        id: uuidv4(),
        status: "approved",
      });
    }
  });

  return breakdata;
};
