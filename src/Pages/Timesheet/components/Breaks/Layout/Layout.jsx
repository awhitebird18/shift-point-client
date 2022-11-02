import { useSelector } from "react-redux";
import styles from "./Layout.module.css";
import BreaksheetRow from "../Row/Row";
import { v4 as uuidv4 } from "uuid";
import { timeIsDateObj } from "../../Functions/timecardFunctions.js";

const Layout = ({ timecardId }) => {
  // Need to create separate useSelector Calls
  let { timesheetData, breaksheetData } = useSelector((state) => {
    const timesheetData = state.timedata.timesheet.find((el) => el.id === timecardId);

    const breaksheetData = state.timedata.breaksheet.filter((el) => el.timesheet === timecardId && !el.remove);

    return {
      timesheetData,
      breaksheetData,
    };
  });

  // If no breaksheet, set an empty breaksheet
  if (!breaksheetData || breaksheetData.length === 0) {
    breaksheetData.push({
      id: uuidv4(),
      breakTypeId: "",
      start: "",
      end: "",
      unpaid: false,
      status: "pending",
      eeNum: timesheetData.eeNum,
      timesheet: timesheetData.id,
      date,
    });
  }

  const breakDeductions = breaksheetData.reduce((prev, curr) => {
    // FIX: This breaks if adjusting start/end times while marked as unpaid
    if (curr.unpaid && timeIsDateObj(curr)) {
      const hours = (curr.end.getTime() - curr.start.getTime()) / 60 / 60 / 1000;
      return (prev += hours);
    }

    return prev;
  }, 0);

  return (
    <table>
      <thead>
        <tr className={`breaks row header ${styles.columns}`}>
          <th>Break Type</th>
          <th>Start</th>
          <th>End</th>
          <th>Hours</th>
          <th>Unpaid</th>
          <th>Status</th>
          <th>More</th>
        </tr>
      </thead>
      <tbody>
        {breaksheetData.map((breakRow, index) => {
          return <BreaksheetRow key={index} date={breakRow.date} timesheetData={timesheetData} breaksheetData={breakRow} />;
        })}
      </tbody>
      <tfoot>
        <tr className={`breaks row ${styles.columns}`}>
          <td></td>
          <td></td>
          <td>Unpaid Break Hours</td>
          <td style={{ textAlign: "center" }}>{breakDeductions}</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Layout;
