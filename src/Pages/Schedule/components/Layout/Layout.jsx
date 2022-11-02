import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFetch, useKeyPressed } from "../../../../hooks";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state";
import Header from "../Header/Header";
import dayjs from "dayjs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ShiftsRow from "../ShiftsRow/ShiftsRow.jsx";
import Footer from "../Footer/Footer.jsx";
import { toast } from "react-hot-toast";
import styles from "./Layout.module.css";

const Layout = () => {
  const [positionList] = useFetch("position");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentShift, setCurrentShift] = useState();
  const [employeeList] = useFetch("employee");
  const [dates, setDates] = useState();
  const [keysPressed, keysPressedRef] = useKeyPressed();

  const currentWeek = useSelector((state) => {
    return state.schedule.currentWeek;
  });

  const [shiftClipBoard, setShiftClipBoard] = useState(null);

  const dispatch = useDispatch();

  const { deleteShift, addNewShift, fetchSchedules, setCurrentWeek } =
    bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const currentDate = dayjs().startOf("week");
    fetchSchedules();

    setCurrentWeek(currentDate);
  }, []);

  useEffect(() => {
    if (!currentWeek) return;

    setDates(() => {
      const dates = [];

      for (let i = 0; i < 7; i++) {
        dates.push(currentWeek.add(i, "day"));
      }

      return dates;
    });
  }, [currentWeek]);

  let schedules = useSelector((state) => {
    return state.schedule.schedules;
  });

  const currentSchedule = schedules.find((el) => {
    return el.current;
  });

  useEffect(() => {
    if (keysPressed.Delete) {
      if (currentShift && !isModalVisible) {
        deleteShift(currentShift._id);
        toast.success("Shift Deleted");
      }
      return;
    }

    if (keysPressed.Control && keysPressed.c && currentShift?._id) {
      setShiftClipBoard(currentShift);
    }

    if (
      keysPressed.Control &&
      keysPressed.v &&
      currentShift &&
      !currentShift._id &&
      currentShift.eeNum &&
      currentShift.date &&
      shiftClipBoard
    ) {
      const newShift = {
        ...shiftClipBoard,
        date: currentShift.date,
        eeNum: currentShift.eeNum,
      };

      delete newShift._id;

      addNewShift(newShift);

      setCurrentShift(null);
    }

    if (keysPressed.Escape) {
      if (shiftClipBoard || currentShift) {
        setShiftClipBoard(null);
        setCurrentShift(null);
      }
    }
  }, [keysPressed]);

  return (
    <div className={styles.container}>
      {currentWeek && <Header currentWeek={currentWeek} />}
      <DndProvider backend={HTML5Backend}>
        {employeeList &&
          currentWeek &&
          currentSchedule?.employeeList.map((employeeId, index, arr) => {
            const employee = employeeList.find((el) => {
              return el._id === employeeId;
            });

            if (!employee) return;

            return (
              <ShiftsRow
                key={index}
                employee={employee}
                dates={dates}
                setIsModalVisible={setIsModalVisible}
                setCurrentShift={setCurrentShift}
                currentShift={currentShift}
                currentSchedule={currentSchedule}
                positionList={positionList}
                keysPressedRef={keysPressedRef}
              />
            );
          })}
      </DndProvider>
      {dates && currentSchedule && (
        <Footer dates={dates} currentSchedule={currentSchedule} />
      )}

      {/* {currentShift && isModalVisible && currentSchedule && (
        <AddShift
          currentSchedule={currentSchedule}
          currentShift={currentShift}
          setCurrentShift={setCurrentShift}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          positionList={positionList}
          employeeList={employeeList}
        />
      )} */}
    </div>
  );
};

export default Layout;
