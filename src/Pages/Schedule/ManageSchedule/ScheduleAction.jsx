import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State";

// Components
import { Button } from "../../../Components";
import { Input } from "antd";

// Styles
import styles from "./ScheduleAction.module.css";

const ScheduleAction = ({ setStep }) => {
  const [newSchedule, setNewSchedule] = useState(null);
  const nameInputRef = useRef();
  const dispatch = useDispatch();

  const { createSchedule } = bindActionCreators(actionCreators, dispatch);

  const handleViewSchedules = () => {
    setStep(2);
  };

  const handleNewSchedule = () => {
    setNewSchedule({ name: "" });
  };

  const handleSave = () => {
    createSchedule(nameInputRef.current.state.value);

    setStep(2);
  };

  return (
    <div className={styles.container}>
      {!newSchedule ? (
        <Button
          className={styles.button}
          type="secondary"
          onClick={handleViewSchedules}
        >
          View Schedules
        </Button>
      ) : (
        <div className={styles.nameInput}>
          <span>Enter Schedule Name</span>
          <Input ref={nameInputRef} />
        </div>
      )}
      <Button
        className={styles.button}
        onClick={!newSchedule ? handleNewSchedule : handleSave}
      >
        {!newSchedule ? "New Schedule" : "Save"}
      </Button>
    </div>
  );
};

export default ScheduleAction;
