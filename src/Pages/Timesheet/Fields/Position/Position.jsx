// React & Redux
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../State";

// Components
import { Select } from "antd";

// Styles
import styles from "../InputStyles.module.css";

// Functions
import {
  updatePosition,
  timeIsDateObj,
} from "../../Functions/timecardFunctions.js";
import { convertToOptionsArr } from "../../Functions/convertToOptions.js";
import { generateBreaks } from "../../Functions/generateBreaks.js";
import { v4 as uuidv4 } from "uuid";

const PositionField = ({
  timedata,
  breakdata,
  date,
  employee,
  timesheetrules,
}) => {
  const dispatch = useDispatch();
  const { storeTimecard, storeBreakdata } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const positionOptions = convertToOptionsArr(
    employee.positions,
    "Select a Position"
  );

  const inputChangeHandler = (e) => {
    const breakdataCopy = [...breakdata];
    const employeePosition = employee.positions.find((el) => {
      return e === el.positionId;
    });

    const updatedTimedata = updatePosition(
      {
        ...timedata,
        id: timedata.id ? timedata.id : uuidv4(),
        date,
        eeNum: employee.eeNum,
      },
      e,
      employeePosition,
      employee
    );

    const updatedBreakdata =
      timeIsDateObj(updatedTimedata) &&
      generateBreaks(updatedTimedata, breakdataCopy, timesheetrules, employee);

    updatedBreakdata && storeBreakdata(updatedBreakdata, updatedTimedata);

    storeTimecard(updatedTimedata);
  };

  const position = timedata.positionId ? timedata.positionId : "";

  return (
    <Select
      className={`${styles.field}`}
      bordered={false}
      value={position}
      onChange={(e) => inputChangeHandler(e)}
    >
      {positionOptions}
    </Select>
  );
};

export default PositionField;
