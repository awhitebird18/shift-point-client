import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../State";

// Components
import { Input } from "antd";

// Styles
import styles from "../InputStyles.module.css";

// Functions
import { generateId } from "../../Functions/timecardFunctions";

const RateField = ({ timedata }) => {
  const dispatch = useDispatch();
  const { storeTimecard } = bindActionCreators(actionCreators, dispatch);

  const inputChangeHandler = (e) => {
    // Need to add validation
    const timedataCopy = { ...timedata, rate: e.target.value, unsaved: true };

    storeTimecard(timedataCopy);
  };

  return (
    <Input
      className={`border--gray hide-screen--small ${styles.field} ${styles.text}`}
      bordered={false}
      value={timedata.rate}
      onChange={inputChangeHandler}
    />
  );
};
export default RateField;
