import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../../state";
import { bindActionCreators } from "redux";
import Header from "../Header/Header";
import styles from "./Dates.module.css";

const Dates = ({ setIsOpen, timesheetRules }) => {
  const [value, setValue] = useState(dayjs());
  const [calendar, setCalendar] = useState([]);

  const startDay = dayjs(value).startOf("month").startOf("week");
  const endDay = dayjs(value).endOf("month").endOf("week");

  const dispatch = useDispatch();
  const { setCurrentWeek } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    let day = dayjs(startDay).subtract(1, "day");
    const a = [];

    while (day.isBefore(endDay, "day")) {
      a.push(
        Array(7)
          .fill(0)
          .map(() => {
            day = day.add(1, "day");
            return day;
          })
      );
    }

    setCalendar(a);
  }, [value]);

  const isPreviousMonth = (j) => {
    return j.isBefore(value.startOf("month"), "day");
  };

  const isNextMonth = (j) => {
    return j.isAfter(value.endOf("month"), "day");
  };

  const isCurrentDay = (j) => {
    return j.isSame(value, "day");
  };

  const dayStyles = (j) => {
    if (isPreviousMonth(j) || isNextMonth(j))
      return `${styles.date} ${styles.otherMonth}`;

    if (isCurrentDay(j)) return `${styles.date} ${styles.currentDate}`;

    return styles.date;
  };

  const handleClick = (e, day) => {
    e.stopPropagation();

    setCurrentWeek(day.startOf("week"));

    setIsOpen(false);
  };

  return (
    <div className={styles.calendar}>
      <Header
        timesheetRules={timesheetRules}
        setValue={setValue}
        value={value}
      />

      <div>
        {calendar.map((week, index) => {
          return (
            <div key={index} className={styles.week}>
              {week.map((day, index) => {
                return (
                  <div
                    key={index}
                    className={dayStyles(day)}
                    onClick={(e) => handleClick(e, day)}
                  >
                    {day.format("DD")}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dates;
