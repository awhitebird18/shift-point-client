import React from "react";

// Components
import TileContainer from "../TileLayout/TileLayout";

// Styles
import styles from "./TaskList.module.css";

const TaskList = () => {
  return (
    <TileContainer headerStyles={{ height: "0" }}>
      <table className={styles.container}>
        <thead>
          <tr className={`list-header--lg ${styles.columns}`}>
            <th>Task</th>
            <th className="hide--tablet">Section</th>
            <th className="hide--tablet">Assigned</th>
            <th>Due Date</th>
            <th className="hide--tablet">Days Remaining</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className={styles.content}>
          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Approve Timecards</td>
            <td className="hide--tablet">Timesheets</td>
            <td className="hide--tablet">Aaron Whitebird</td>
            <td>Aug 6th</td>
            <td className="hide--tablet">2</td>
            <td>
              <div className={styles.complete}>Complete</div>
            </td>
          </tr>
          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Review New Employees</td>
            <td className="hide--tablet">Employees</td>
            <td className="hide--tablet">Aaron Whitebird</td>
            <td>Aug 6th</td>
            <td className="hide--tablet">6</td>
            <td>
              <div className={styles.due}>Past Due</div>
            </td>
          </tr>
          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Mid-Cycle Timecard Review</td>
            <td className="hide--tablet">Timesheets</td>
            <td className="hide--tablet">Aaron Whitebird</td>
            <td>Aug 8th</td>
            <td className="hide--tablet">1</td>
            <td>
              <div className={styles.complete}>Complete</div>
            </td>
          </tr>

          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Review Office Schedules</td>
            <td className="hide--tablet">Scheduler</td>
            <td className="hide--tablet">Aaron Whitebird</td>
            <td>Aug 8th</td>
            <td className="hide--tablet">1</td>
            <td>
              <div className={styles.complete}>Complete</div>
            </td>
          </tr>
        </tbody>
      </table>
    </TileContainer>
  );
};

export default TaskList;
