// Styles
import styles from "./ModuleHeader.module.css";

const TimesheetHeader = () => {
  return (
    <div className={styles.headerTitle}>
      <div className={styles.title}>
        <h1>Timesheets</h1>
      </div>
    </div>
  );
};

export default TimesheetHeader;
