import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../State";

// Components
import { Input } from "antd";

// Styles
import styles from "../InputStyles.module.css";
import "../AntOverride.css";

// Functions
import { updateTime, timeIsDateObj } from "../../Functions/timecardFunctions";
import { generateBreaks } from "../../Functions/generateBreaks";
import { generateDailyOT } from "../../Functions/generateDailyOT";
import { generateWeeklyOT } from "../../Functions/generateWeeklyOT";
import { convertToHours12 } from "../../../../Misc/timesheetUtils.js";

const TimeField = ({ timedata, breakdata, type, timesheetrules, employee }) => {
  const dispatch = useDispatch();
  const { storeTimecard, storeBreakdata } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const inputChangeHandler = (e) => {
    const timedataCopy = { ...timedata };
    const breakdataCopy = [...breakdata];
    const updatedTimedata = updateTime(timedataCopy, e, type);

    const updatedBreakdata =
      timeIsDateObj(updatedTimedata) &&
      generateBreaks(updatedTimedata, breakdataCopy, timesheetrules, employee);

    updatedBreakdata && storeBreakdata(updatedBreakdata, updatedTimedata);

    storeTimecard(updatedTimedata);
  };

  const timeValue =
    Object.prototype.toString.call(timedata[type]) === "[object Date]"
      ? convertToHours12(timedata[type])
      : timedata[type]
      ? timedata[type]
      : "";

  return (
    <Input
      className={`border--gray ${styles.field} ${styles.text}`}
      bordered={false}
      value={timeValue}
      onChange={(e) => inputChangeHandler(e.target.value)}
    />
  );
};
export default TimeField;
