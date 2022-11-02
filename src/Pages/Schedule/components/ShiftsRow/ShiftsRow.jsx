import styles from "./ShiftsRow.module.css";
import ShiftsTile from "../ShiftsTile/ShiftsTile.jsx";
import { ProfilePicture } from "../../../../components";

const ScheduleRow = ({
  employee,
  dates,
  setIsModalVisible,
  currentShift,
  setCurrentShift,
  currentSchedule,
  positionList,
  keysPressedRef,
}) => {
  return (
    <div className={`schedule row ${styles.row}`}>
      <div className={styles.employeeInfo}>
        <div className={styles.imageContainer}>
          <ProfilePicture user={employee} />
        </div>

        <div
          className={styles.employeeName}
        >{`${employee.firstName} ${employee.lastName}`}</div>
      </div>

      {dates.map((date, index) => {
        return (
          <ShiftsTile
            key={index}
            date={date}
            employee={employee}
            setIsModalVisible={setIsModalVisible}
            currentShift={currentShift}
            setCurrentShift={setCurrentShift}
            currentSchedule={currentSchedule}
            positionList={positionList}
            keysPressedRef={keysPressedRef}
          />
        );
      })}
    </div>
  );
};

export default ScheduleRow;
