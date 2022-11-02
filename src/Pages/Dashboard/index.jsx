import Bulletin from "./components/Bulletin/Bulletin";
import TimesheetStatusGraph from "./components/TimesheetStatusGraph/TimesheetStatusGraph";
import TimesheetEarningGraph from "./components/TimesheetEarningGraph/TimesheetEarningGraph";
import TaskList from "./components/TaskList/TaskList";
import TimesheetStats from "./components/TimesheetStats/TimesheetStats";
import styles from "./index.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.leftSection}>
        <h2 className={styles.dashHeader}>Today at a Glance</h2>

        <TimesheetStats />

        <div className={styles.graphs}>
          <div className={styles.tile}>
            <TimesheetStatusGraph />
          </div>
          <div className={styles.tile}>
            <TimesheetEarningGraph />
          </div>
        </div>

        <h2 className={styles.dashHeader}>
          Assigned Tasks{" "}
          <span style={{ color: "var(--color_gray_6)", fontSize: "0.8rem" }}>
            (In Development)
          </span>
        </h2>
        <div className={styles.tile} style={{ minHeight: "30rem" }}>
          <TaskList />
        </div>
      </div>

      <div className={styles.rightSection}>
        <Bulletin />
      </div>
    </div>
  );
};

export default Dashboard;
