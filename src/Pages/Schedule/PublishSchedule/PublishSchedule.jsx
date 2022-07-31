import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State";

// Components
import { DatePicker } from "antd";
import { Button } from "../../../Components";

// Styles
import styles from "./PublishSchedule.module.css";

const PublishSchedule = () => {
  const [date, setDate] = useState();

  const { schedules } = useSelector((state) => {
    return state.schedule;
  });
  const currentSchedule = schedules.find((el) => el.current);

  const handleChange = (date, dateStr) => {
    setDate(date);
  };

  const dispatch = useDispatch();

  const { updateSchedule, showModal } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handlePublish = () => {
    if (!currentSchedule || !date) return;
    updateSchedule({
      ...currentSchedule,
      publishedTo: date.toString(),
    });

    showModal(null);
  };

  return (
    <div className={styles.container}>
      <h3>Select Date</h3>
      <DatePicker onChange={handleChange} />

      <Button style={{ height: "2.5rem" }} onClick={handlePublish}>
        Publish
      </Button>
    </div>
  );
};

export default PublishSchedule;
