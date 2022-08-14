import { shallowEqual, useSelector } from "react-redux";

// Components
import Header from "../Header/Header";
import RowDateGroup from "../RowDateGroup/RowDateGroup";

// Styles
import styles from "./TimecardLayout.module.css";
import rowStyles from "./RowStyles.module.css";

// Data & Functions
import calcApprovedHours from "../Functions/calcApprovedHours";

const TimecardLayout = ({
  employee,
  departments,
  dateRange,
  dateRangeHelper,
  earningOptions,
}) => {
  const timedata = useSelector((state) => {
    return state.timedata.timesheet;
  }, shallowEqual);

  const breakdata = useSelector((state) => {
    return state.timedata.breaksheet;
  }, shallowEqual);

  const timeFilter = useSelector((state) => {
    const filteredState = state.filter.timesheetFilter.filter((el) => {
      return el.active && (el.type === "status" || el.type === "employee");
    });

    return filteredState;
  });

  const filteredTimedata = timedata
    .filter((timecard) => {
      if (timecard.id || timecard.unsaved) return true;
    })
    .filter((timecard) => {
      let passed = true;

      if (timecard.eeNum !== employee.eeNum) return false;
      if (timecard.unsaved) return true;

      for (let i = 0; i < timeFilter.length; i++) {
        // if (
        //   timeFilter[i].type === "punch" &&
        //   timeFilter[i].subtype === "is" &&
        //   ((timecard.start && timecard.end) ||
        //     (!timecard.start && !timecard.end))
        // ) {
        //
        //   passed = false;
        // }

        // if (
        //   timeFilter[i].type === "punch" &&
        //   timeFilter[i].subtype === "isNot" &&
        //   (!timecard.start || !timecard.end)
        // ) {
        //
        //   passed = false;
        // }

        if (timeFilter[i].type === "employee") {
          // Missing Punches
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

  const approvedHours = calcApprovedHours(
    filteredTimedata,
    breakdata,
    dateRange
  );

  if (
    timeFilter.length &&
    filteredTimedata.length <= 1 &&
    !filteredTimedata[0]?.id
  )
    return null;

  return (
    <section className={styles.timecard}>
      <Header employee={employee} departments={departments} />
      <div className={styles.table}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="timecard row columns">
              <th className={styles.date}>Date</th>

              <th className="hide--tablet">Position</th>

              <th className="hide--mobile">Type</th>

              <th>Start</th>

              <th>End</th>

              <th>Hours</th>

              <th className="hide--medium">Rate</th>

              <th>Status</th>

              <th>
                <span style={{ textAlign: "center" }} className="hide--mobile">
                  More
                </span>
              </th>
            </tr>
          </thead>

          {/* Main Content */}
          <tbody>
            {dateRangeHelper.map((date, index) => {
              return (
                <RowDateGroup
                  key={index}
                  date={date}
                  employee={employee}
                  earningOptions={earningOptions}
                />
              );
            })}
          </tbody>

          <tfoot>
            <tr className="timecard row summary">
              <td></td>
              <td className="hide--mobile"></td>
              <td className="hide--tablet"></td>
              <td className={styles.approvedLabel} colspan="2">
                Approved Hours
              </td>

              <td style={{ textAlign: "center" }}>{approvedHours}</td>
              <td className="hide--medium"></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default TimecardLayout;
