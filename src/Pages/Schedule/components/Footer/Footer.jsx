import { useSelector } from "react-redux";
import styles from "./Footer.module.css";

const Footer = ({ dates, currentSchedule }) => {
  const shifts = useSelector((state) => {
    return state.schedule.shifts;
  });

  const currentSchedulesShifts = shifts.filter((shift) => shift.scheduleId === currentSchedule._id);

  const totalHours = currentSchedulesShifts
    .reduce((prev, curr) => {
      const hours = curr.end.diff(curr.start) / 60 / 60 / 1000;

      return (prev += hours);
    }, 0)
    .toFixed(2);

  return (
    <div className={`schedule row ${styles.footer}`}>
      <div className={`${styles.tile} ${styles.first}`}>{`Week: ${totalHours} Scheduled Hrs`}</div>
      {currentSchedulesShifts &&
        dates.map((date, index) => {
          const hours = currentSchedulesShifts.reduce((prev, curr) => {
            if (curr.date.isSame(date, "day")) {
              const hours = curr.end.diff(curr.start);

              return (prev += hours);
            }

            return prev;
          }, 0);

          return <div key={index} className={styles.tile}>{`${hours / 60 / 60 / 1000}.0 H`}</div>;
        })}
    </div>
  );
};

export default Footer;
