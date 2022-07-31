// Styles
import styles from "../InputStyles.module.css";

// Functions
import { calculateBreakDeduction } from "../../Functions/timecardFunctions";

const HoursField = ({ timedata, breakdata }) => {
  const breakDeductions = calculateBreakDeduction(breakdata);

  const hours =
    Object.prototype.toString.call(timedata.start) === "[object Date]" &&
    Object.prototype.toString.call(timedata.end) === "[object Date]" &&
    timedata.earningId !== "622d38b5e89141814d30a9c8"
      ? (
          (timedata.end.getTime() - timedata.start.getTime()) / 3600000 -
          breakDeductions
        ).toFixed(2)
      : "";

  return (
    <div className={`border--gray ${styles.field} ${styles.hours}`}>
      {hours}
    </div>
  );
};

export default HoursField;
