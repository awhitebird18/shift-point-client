import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state";
import { DatePicker } from "antd";
import { Button } from "../../../../components";
import styles from "./PublishSchedule.module.css";

const PublishSchedule = () => {
  const [date, setDate] = useState();

  const { schedules } = useSelector((state) => {
    return state.schedule;
  });
  const currentSchedule = schedules.find((el) => el.current);

  const handleChange = (date) => {
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

  const handleCancel = () => {
    showModal(null);
  };

  return (
    <div className={styles.container}>
      <h3>Select Date</h3>
      <DatePicker onChange={handleChange} />

      <div className={styles.formActions}>
        <Button
          type="secondary"
          style={{ marginLeft: "auto" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>

        <Button onClick={handlePublish}>Publish</Button>
      </div>
    </div>
  );
};

export default PublishSchedule;
