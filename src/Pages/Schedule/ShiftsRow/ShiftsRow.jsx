import { useState } from "react";

// Styles
import styles from "./ShiftsRow.module.css";

// Components
import ShiftsTile from "../ShiftsTile/ShiftsTile.jsx";
import { BsThreeDots } from "react-icons/bs";
import { ProfilePicture } from "../../../Components";

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
  const [showExtendedInfo, setShowExtendedInfo] = useState(false);

  return (
    <div className={`schedule row ${styles.row}`}>
      <div className={styles.employeeInfo}>
        <div className={styles.imageContainer}>
          <ProfilePicture user={employee} />
        </div>

        <div
          className={styles.employeeName}
        >{`${employee.firstName} ${employee.lastName}`}</div>

        <div className={styles.moreOptions}>
          <BsThreeDots onClick={() => setShowExtendedInfo((prev) => !prev)} />
          {showExtendedInfo && (
            <div className={styles.extendedEmployeeInfo}>
              Department: Office Cost Centre: Direct
            </div>
          )}
        </div>
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
