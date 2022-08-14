import React from "react";

import { useSelector } from "react-redux";

// Components
import TimecardRow from "../Row/Row";

const TimecardDate = ({ date, employee, earningOptions }) => {
  let timeFilter = useSelector((state) => {
    return state.filter.timesheetFilter;
  });

  let timedata = useSelector((state) => {
    return state.timedata.timesheet.filter((el) => {
      return (
        el.eeNum === employee.eeNum && el.date.getTime() === date.getTime()
      );
    });
  });

  const filteredData = timedata.filter((timecard) => {
    let passed = true;

    if (timecard.eeNum !== employee.eeNum) return false;
    if (timecard.unsaved) return true;

    for (let i = 0; i < timeFilter.length; i++) {
      // if (
      //   timeFilter[i].type === "punch" &&
      //   timeFilter[i].subtype === "is" &&
      //   ((timecard.start && timecard.end) || (!timecard.start && !timecard.end))
      // ) {
      //
      //   passed = false;
      // }

      // if (
      //   timeFilter[i].type === "punch" &&
      //   timeFilter[i].subtype === "isNot" &&
      //   ((timecard.start && timecard.end) || (!timecard.start && !timecard.end))
      // ) {
      //
      //   passed = false;
      // }

      if (timeFilter[i].type === "employee") {
        if (
          timeFilter[i].subtype === "isMissingPunches" &&
          ((timecard.start && timecard.end) ||
            (!timecard.start && !timecard.end))
        ) {
          passed = false;
        }

        if (
          timeFilter[i].subtype === "isNotMissingPunches" &&
          timecard.start &&
          timecard.end
        ) {
          passed = false;
        }

        // Signed in
        if (timeFilter[i].subtype === "isSignedIn" && !timecard.start) {
          passed = false;
        }

        // Signed out
        if (timeFilter[i].subtype === "isSignedOut" && !timecard.end) {
          passed = false;
        }
      }
      // if (
      //   timeFilter[i].type === "end" &&
      //   timeFilter[i].subtype === "is" &&
      //   timecard.end &&
      //   !timecard.unsaved
      // ) {
      //   passed = false;
      // }

      // if (
      //   timeFilter[i].type === "end" &&
      //   timeFilter[i].subtype === "isNot" &&
      //   !timecard.end &&
      //   !timecard.unsaved
      // ) {
      //   passed = false;
      // }

      // if (timeFilter[i].type === "end" && !timecard.end && !timecard.start) {
      //   passed = false;
      // }

      // if (
      //   timeFilter[i].type === "start" &&
      //   timeFilter[i].subtype === "is" &&
      //   timecard.start &&
      //   !timecard.unsaved
      // ) {
      //   passed = false;
      // }

      if (timeFilter[i].type === "status") {
        if (
          timeFilter[i].subtype === "is" &&
          timeFilter[i].value !== timedata.status
        ) {
          passed = false;
        } else if (
          timeFilter[i].subtype === "isNot" &&
          timeFilter[i].value === timedata.status
        ) {
          passed = false;
        }
      }
    }

    return passed;
  });

  // if (statusFilter[0]?.type === "status" && statusFilter[0].value) {
  //   filteredData = timedata.filter((el) => {
  //     if (statusFilter[0].subtype === "is") {
  //       if (statusFilter[0].value === "empty") {
  //         return (!el.status && !el.unsaved) || el.unsaved;
  //       } else {
  //         return (
  //           (el?.status === statusFilter[0].value && !el.unsaved) || el.unsaved
  //         );
  //       }
  //       return (
  //         (el?.status === statusFilter[0].value && !el.unsaved) || el.unsaved
  //       );
  //     } else {
  //       if (statusFilter[0].value === "empty") {
  //         return (el.status && !el.unsaved) || el.unsaved;
  //       } else {
  //         return (
  //           (el.status && el.status !== statusFilter[0].value && !el.unsaved) ||
  //           el.unsaved
  //         );
  //       }
  //     }
  //   });
  // } else {
  //   filteredData = [...timedata];
  // }

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
