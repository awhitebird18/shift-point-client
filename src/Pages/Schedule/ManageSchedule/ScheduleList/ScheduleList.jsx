import { useState } from "react";
import { useSelector } from "react-redux";
import ScheduleDetailed from "./ScheduleDetailed";
import { Button } from "../../../../Components";

import styles from "./ScheduleList.module.css";

const ScheduleList = ({ setStep }) => {
  const [current, setCurrent] = useState(null);
  const schedules = useSelector((state) => {
    return state.schedule.schedules;
  });

  const { currentUser } = useSelector((state) => {
    return state.user;
  });

  const handleViewSchedule = (schedule) => {
    setCurrent(schedule);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div>
      <div className={styles.currentSchedule}>
        <h3 className={styles.title}>
          {current ? current.name : "Select A Schedule"}
        </h3>
      </div>

      {!current ? (
        <div className={styles.scheduleList}>
          <div className={`list-header--md ${styles.columns}`}>
            <span>Name</span>
            <span>Owner</span>
            <span>Created On</span>
            <span>Employee Count</span>
          </div>
          {schedules?.map((schedule, index) => {
            return (
              <div
                key={index}
                className={`list-item--md ${styles.columns}`}
                onClick={() => handleViewSchedule(schedule)}
              >
                <div>{schedule.name}</div>
                <div>{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                <div>March 20, 2022</div>
                <div>{schedule.employeeList.length}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <ScheduleDetailed current={current} setCurrent={setCurrent} />
      )}

      {!current && (
        <div className={styles.buttonSection}>
          <Button
            type="secondary"
            style={{
              width: "7rem",
              height: "2.5rem",
            }}
            onClick={handleBack}
          >
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
