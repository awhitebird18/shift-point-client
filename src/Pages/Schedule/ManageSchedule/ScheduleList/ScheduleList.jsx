import { useState } from "react";
import { useSelector } from "react-redux";

// Components
import ScheduleDetailed from "./ScheduleDetailed";
import { Button } from "../../../../Components";

// Styles
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
    <div className={styles.container}>
      {/* <div className={styles.currentSchedule}>
        <h3 className={styles.title}>
          {current ? current.name : "Select A Schedule"}
        </h3>
      </div> */}

      {!current ? (
        <div className={styles.scheduleList}>
          <div className={`list-header--md ${styles.columns}`}>
            <div>Name</div>
            <div className="hide--tablet">Owner</div>
            <div className="hide--tablet">Created On</div>
            <div>Employee Count</div>
          </div>
          {schedules?.map((schedule, index) => {
            return (
              <div
                key={index}
                className={`list-item--md ${styles.columns}`}
                onClick={() => handleViewSchedule(schedule)}
              >
                <div>{schedule.name}</div>
                <div className="hide--tablet">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
                <div className="hide--tablet">March 20, 2022</div>
                <div>{schedule.employeeList.length}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <ScheduleDetailed current={current} setCurrent={setCurrent} />
      )}

      {!current && (
        <div className={styles.formActions}>
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
