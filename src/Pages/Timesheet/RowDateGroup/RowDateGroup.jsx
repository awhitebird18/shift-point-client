import React from "react";

import { useSelector } from "react-redux";

// Components
import TimecardRow from "../Row/Row";

const TimecardDate = ({ date, employee, earningOptions }) => {
  let statusFilter = useSelector((state) => {
    return state.filter.timesheetFilter;
  });

  let timedata = useSelector((state) => {
    return state.timedata.timesheet.filter((el) => {
      return (
        el.eeNum === employee.eeNum && el.date.getTime() === date.getTime()
      );
    });
  });

  let filteredData = [];

  if (statusFilter[0]?.type === "status" && statusFilter[0].value) {
    filteredData = timedata.filter((el) => {
      if (statusFilter[0].subtype === "is") {
        if (statusFilter[0].value === "empty") {
          return (!el.status && !el.unsaved) || el.unsaved;
        } else {
          return (
            (el?.status === statusFilter[0].value && !el.unsaved) || el.unsaved
          );
        }
        return (
          (el?.status === statusFilter[0].value && !el.unsaved) || el.unsaved
        );
      } else {
        if (statusFilter[0].value === "empty") {
          return (el.status && !el.unsaved) || el.unsaved;
        } else {
          return (
            (el.status && el.status !== statusFilter[0].value && !el.unsaved) ||
            el.unsaved
          );
        }
      }
    });
  } else {
    filteredData = [...timedata];
  }

  return (
    <>
      {filteredData.map((timedata, index) => {
        return (
          <TimecardRow
            rowCount={index}
            key={index}
            timedata={timedata}
            employee={employee}
            earningOptions={earningOptions}
          />
        );
      })}
    </>
  );
};

export default React.memo(TimecardDate);
