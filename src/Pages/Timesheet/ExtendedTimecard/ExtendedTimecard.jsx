// React & Redux
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State/index.js";

// Styles
import styles from "./ExtendedTimecard.module.css";

// Components
import { Modal, Typography, Space } from "antd";
const { Title, Text } = Typography;

// Data and Functions
import {
  convertToHours12,
  days,
  months,
} from "../../../Misc/timesheetUtils.js";
import { v4 as uuidv4 } from "uuid";
import { timeIsDateObj } from "../Functions/timecardFunctions";
import Premiums from "../Premiums/Premiums";
import Breaks from "../Breaks/Layout/Layout";

const ExtendedTimecard = ({ timecardId }) => {
  // Need to create separate useSelector Calls
  let { timesheetData, breaksheetData } = useSelector((state) => {
    const timesheetData = state.timedata.timesheet.find(
      (el) => el.id === timecardId
    );

    const breaksheetData = state.timedata.breaksheet.filter(
      (el) => el.timesheet === timecardId && !el.remove
    );

    return {
      timesheetData,
      breaksheetData,
    };
  });

  const date = timesheetData?.date;

  const dateDisplay = `${months[date.getMonth()]} ${date.getDate()}`;

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

  // Redux Actions
  const dispatch = useDispatch();

  const { toggleExtendedModal } = bindActionCreators(actionCreators, dispatch);

  const handleOk = () => {
    toggleExtendedModal(null);
  };

  const handleCancel = () => {
    toggleExtendedModal(null);
  };

  const timecardDisplay = {
    start:
      timesheetData &&
      Object.prototype.toString.call(timesheetData.start) === "[object Date]"
        ? convertToHours12(timesheetData.start)
        : timesheetData.start
        ? timesheetData.start
        : "",
    end:
      timesheetData &&
      Object.prototype.toString.call(timesheetData.end) === "[object Date]"
        ? convertToHours12(timesheetData.end)
        : timesheetData.end
        ? timesheetData.end
        : "",
  };

  return (
    <div>
      <div className={styles.breakHeader}>
        <Space direction="vertical" style={{ display: "block" }}>
          <span style={{ display: "inline" }} type="secondary">
            {`${days[date.getDay()]} ${dateDisplay}`}
            {", "}
            {timecardDisplay &&
              `${timecardDisplay.start ? timecardDisplay.start : ""} - ${
                timecardDisplay.end ? timecardDisplay.end : ""
              }`}
          </span>
          <span type="secondary">Kermit the Frog</span>
        </Space>
      </div>

      <div>
        <div className={styles.section}>
          <h2>Breaks</h2>
          <Breaks timecardId={timecardId} />
        </div>
        <div className={styles.section}>
          <h2>Premiums</h2>
          <Premiums timecardId={timecardId} />
        </div>
      </div>
    </div>
  );
};

export default ExtendedTimecard;
