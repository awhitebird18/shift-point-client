import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../../state";
import { Select } from "antd";
import styles from "../InputStyles.module.css";
import { v4 as uuidv4 } from "uuid";
import { updateEarning } from "../../Functions/timecardFunctions.js";

const EarningField = ({ timedata, earningOptions, date, employee }) => {
  const dispatch = useDispatch();

  const { storeTimecard } = bindActionCreators(actionCreators, dispatch);

  const earning = timedata.earningId ? timedata.earningId : "";

  const inputChangeHandler = (e) => {
    const updatedTimedata = updateEarning(
      {
        ...timedata,
        id: timedata.id ? timedata.id : uuidv4(),
        date,
        eeNum: employee.eeNum,
      },
      e
    );

    const employeeEarning = employee.earnings.find((el) => {
      return el.earningId === e;
    });

    if (employeeEarning) {
      updatedTimedata.rate = employeeEarning.rate;
    }

    storeTimecard(updatedTimedata);
  };

  return (
    <Select
      className={`${styles.field}`}
      value={earning}
      bordered={false}
      onChange={(e) => inputChangeHandler(e)}
    >
      {earningOptions}
    </Select>
  );
};

export default EarningField;
