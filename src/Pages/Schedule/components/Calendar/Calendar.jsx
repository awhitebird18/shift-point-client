import { useState } from "react";
import Dropdown from "./Dropdown";
import { BsCalendar2 } from "react-icons/bs";
import styles from "./Calendar.module.css";
import { useFetch } from "../../../../hooks";
import { useSelector } from "react-redux";

const Calendar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timesheetRules] = useFetch("timesheetRules");
  const currentWeek = useSelector((state) => {
    return state.schedule.currentWeek;
  });

  const handleClick = () => {
    setIsOpen(true);
  };

  const dateDisplay = () => {
    if (!currentWeek) return;
    const endDate = currentWeek.add(7, "day");

    return `${currentWeek.format("MMM DD")} - ${endDate.format(
      currentWeek.isSame(endDate, "month") ? "DD, YYYY" : "MMM DD, YYYY"
    )}`;
  };

  return (
    <>
      <div onClick={handleClick} className={styles.input}>
        <span>{dateDisplay()}</span>
        <div className={`header-gray ${styles.icon}`}>
          <BsCalendar2 />
        </div>
        {isOpen && (
          <Dropdown
            timesheetRules={timesheetRules}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
        )}
      </div>
    </>
  );
};

export default Calendar;
