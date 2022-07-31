// React & Redux
import { shallowEqual, useSelector } from "react-redux";
import useFetch from "../../../Hooks/useFetch";

// Styles
import styles from "./Premiums.module.css";

// Components
import Row from "./Row/Row";
import { calculateBreakDeduction } from "../Functions/timecardFunctions";

const Premiums = ({ timecardId }) => {
  const [premiumList] = useFetch("premium");

  let timesheetData = useSelector((state) => {
    return state.timedata.timesheet.find((el) => el.id === timecardId);
  });

  let breaksheetData = useSelector((state) => {
    return state.timedata.breaksheet.filter(
      (el) => el.timesheet === timecardId
    );
  }, shallowEqual);

  const breakDeductions = calculateBreakDeduction(breaksheetData);

  return (
    <table>
      <thead>
        <tr className={styles.row}>
          <th>Premium Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Hours</th>
          <th>Rate</th>
          <th>Status</th>
          <th>More</th>
        </tr>
      </thead>
      <tbody>
        {timesheetData.premiums.map((premium, index) => {
          return (
            <Row
              key={index}
              date={premium.date}
              premiumData={premium}
              premiumList={premiumList}
              timedata={timesheetData}
              breakDeductions={breakDeductions}
            />
          );
        })}
      </tbody>
      <tfoot>
        <tr className={styles.rowSummary}>
          <td></td>
          <td className={styles.breakHours}>Premium Hours</td>
          <td className={styles.summaryHours}></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Premiums;
