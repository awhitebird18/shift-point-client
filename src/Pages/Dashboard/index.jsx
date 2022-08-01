// Components
import TimesheetStats from "./TimesheetStats/TimesheetStats";
import Bulletin from "./Bulletin/Bulletin";
import TimesheetStatusGraph from "./TimesheetStatusGraph/TimesheetStatusGraph";
import ProductNews from "./ProductNews/ProductNews";
import TileManager from "./TileManager/TileManager";
import TimesheetEarningGraph from "./TimesheetEarningGraph/TimesheetEarningGraph";
import Alerts from "./Alerts/Alerts";
import TaskList from "./TaskList/TaskList";
import TimesheetMiniStat from "./TimesheetMiniStat/TimesheetMiniStat";

import AccountDetails from "./AccountDetails/AccountDetails";

import { BsChatDotsFill } from "react-icons/bs";

import {
  BsFillPersonCheckFill,
  BsFillPersonXFill,
  BsCalendar4Week,
  BsAlignEnd,
  BsHandThumbsUp,
} from "react-icons/bs";

// Styles
import styles from "./index.module.css";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.leftSection}>
        <h2 className={styles.dashHeader}>Timesheet Stats</h2>
        <div className={styles.timesheetMiniStats}>
          <TimesheetMiniStat
            title="Clocked In"
            icon={BsHandThumbsUp}
            stat={1}
          />
          <TimesheetMiniStat
            title="Missed Punches"
            icon={BsFillPersonXFill}
            stat={0}
          />
          <TimesheetMiniStat
            title="Scheduled"
            icon={BsCalendar4Week}
            stat={10}
          />
        </div>

        <div className={styles.graphs}>
          <div className={styles.tile}>
            <TimesheetStatusGraph />
          </div>
          <div className={styles.tile}>
            <TimesheetEarningGraph />
          </div>
        </div>

        <h2 className={styles.dashHeader}>Assigned Tasks</h2>
        <div className={styles.tile} style={{ minHeight: "30rem" }}>
          <TaskList />
        </div>
      </div>

      <div className={styles.rightSection}>
        <h2 className={styles.dashHeader}>Company Bulletins</h2>
        <div>
          {/* <AccountDetails /> */}
          <Bulletin />
        </div>
      </div>

      <div className={styles.chatWrapper}>
        <div className={styles.chat}>
          <BsChatDotsFill size={60} />
        </div>
        <div className={styles.chatShadow} />
      </div>
    </div>
  );
};

export default Dashboard;
