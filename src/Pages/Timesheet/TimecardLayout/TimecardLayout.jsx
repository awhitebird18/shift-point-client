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
      return el.active && el.type === "shift";
    });

    return filteredState;
  });

  const filteredTimedata = timedata.filter((timecard) => {
    if (timecard.status === timeFilter[0]?.value) {
      return timecard;
    }
  });

  const approvedHours = calcApprovedHours(
    filteredTimedata,
    breakdata,
    dateRange
  );

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
            <tr className="timecard row columns">
              <td></td>
              <td className="hide--mobile"></td>
              <td className="hide--tablet"></td>
              <td className={styles.approvedLabel}>Approved Hours</td>
              <td style={{ textAlign: "center" }}>{approvedHours}</td>
              <td></td>
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
