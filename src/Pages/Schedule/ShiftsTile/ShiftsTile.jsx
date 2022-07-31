import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State/index.js";
import { useSelector } from "react-redux";

// Components
import { useDrop } from "react-dnd";
import Shift from "../Shift/Shift";
import { BsThreeDots, BsPlus } from "react-icons/bs";

// Styles
import styles from "./ShiftsTile.module.css";

const ShiftsTile = ({
  date,
  employee,
  setIsModalVisible,
  currentShift,
  setCurrentShift,
  currentSchedule,
  positionList,
  keysPressedRef,
}) => {
  const dispatch = useDispatch();

  const { addNewShift, deleteShift, setNotification } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const shifts = useSelector((state) => {
    return state.schedule.shifts.filter((el) => {
      return date.isSame(el.date, "day") && +el.eeNum === employee.eeNum;
    });
  });

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "shift",
      drop: (item) => copyShift(item),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [date]
  );

  const copyShift = (shift) => {
    const newShift = { ...shift, eeNum: employee.eeNum, date };

    delete newShift._id;

    addNewShift(newShift);

    console.log(keysPressedRef.current);

    if (keysPressedRef.current.Control) {
      return;
    }

    deleteShift(shift._id);
  };

  const handleAddShift = (e) => {
    e.stopPropagation();

    setCurrentShift({
      eeNum: employee.eeNum,
      positionId: "",
      departmentId: "",
      sheduleId: "",
      start: "",
      end: "",
      colorCode: "",
      date: date,
      scheduleId: currentSchedule._id,
    });
    setIsModalVisible(true);
  };

  const handleFocusDay = (e, shift) => {
    e.stopPropagation();
    setCurrentShift({ ...shift });
  };

  const dateTileStyle = {};
  dateTileStyle.background = isOver ? "#f0f0f0" : "#fff";

  return (
    <div
      className={styles.dailyShifts}
      onClick={(e) => handleFocusDay(e, { date, eeNum: employee.eeNum })}
      onDoubleClick={(e) => handleAddShift(e, { date, eeNum: employee.eeNum })}
      style={dateTileStyle}
      ref={drop}
    >
      {shifts.map((shift, index) => {
        return (
          <Shift
            key={index}
            employee={employee}
            shift={shift}
            currentShift={currentShift}
            setCurrentShift={setCurrentShift}
            setIsModalVisible={setIsModalVisible}
            positionList={positionList}
            date={date}
            currentSchedule={currentSchedule}
          />
        );
      })}
      <div className={styles.shiftOptions}>
        <div className={styles.shiftAction} onClick={handleAddShift}>
          <BsPlus />
        </div>
        <div className={styles.shiftAction}>
          <BsThreeDots />
        </div>
      </div>
    </div>
  );
};

export default ShiftsTile;
