import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = ({ currentWeek }) => {
  const { schedules } = useSelector((state) => {
    return state.schedule;
  });
  const currentSchedule = schedules.find((el) => el.current);

  function isPublished(currentSchedule, date) {
    if (!currentSchedule?.publishedTo) return false;

    return date.isBefore(currentSchedule.publishedTo.add(1, "day"), "day") ? true : false;
  }

  const dates = [];

  for (let i = 0; i < 7; i++) {
    dates.push(currentWeek.add(i, "day"));
  }

  return (
    <div className={`schedule row ${styles.row}`}>
      <div className={`header-gray ${styles.employeesScheduled}`}>Scheduled: 2/3</div>

      {dates?.map((date, index) => {
        isPublished(currentSchedule, date);
        return (
          <div key={index} className={styles.tile}>
            <span className={styles.date}>{date.format("D")}</span>
            <span className={`header-gray ${styles.day}`}>{date.format("ddd")}</span>

            {isPublished(currentSchedule, date) && (
              <div className={styles.publishedIcon} style={{ color: "#fff" }}>
                &#10003;
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Header;
