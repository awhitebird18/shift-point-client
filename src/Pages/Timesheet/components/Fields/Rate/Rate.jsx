import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../../state";
import { Input } from "antd";
import styles from "../InputStyles.module.css";

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
      className={`hide-screen--small ${styles.field} ${styles.text}`}
      bordered={false}
      value={timedata.rate}
      onChange={inputChangeHandler}
    />
  );
};
export default RateField;
