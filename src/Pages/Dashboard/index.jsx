// Components
import TimesheetStats from "./TimesheetStats/TimesheetStats";
import Bulletin from "./Bulletin/Bulletin";
import TimesheetStatusGraph from "./TimesheetStatusGraph/TimesheetStatusGraph";
import ProductNews from "./ProductNews/ProductNews";
import TileManager from "./TileManager/TileManager";
import TimesheetEarningGraph from "./TimesheetEarningGraph/TimesheetEarningGraph";
import Alerts from "./Alerts/Alerts";
import TaskList from "./TaskList/TaskList";

// Styles
import styles from "./index.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.tiles}>
        <div className={styles.tile}>
          <TimesheetStats />
        </div>
        <div className={styles.tile}>
          <TimesheetStatusGraph />
        </div>
        <div className={styles.tile}>
          <TimesheetEarningGraph />
        </div>
        <div className={styles.tile}>
          <Alerts />
        </div>
        <div className={styles.tile}>
          <TaskList />
        </div>
        <div className={styles.tile}>
          <Bulletin />
        </div>

        <div
          className={`${styles.tile} ${styles.tileFull}`}
          style={{ background: "none" }}
        >
          <TileManager />
        </div>
      </div>

      <div className={styles.bulletin}>
        <ProductNews />
      </div>
    </div>
  );
};

export default Dashboard;
