import React from "react";

// Components
import TileContainer from "../TileLayout/TileLayout";

// Styles
import styles from "./TaskList.module.css";

const TaskList = () => {
  return (
    <TileContainer headerStyles={{ height: "0" }}>
      <table className={styles.container}>
        <tr className={`list-header--lg ${styles.columns}`}>
          <th>Task</th>
          <th>Section</th>
          <th>Assigned</th>
          <th>Due Date</th>
          <th>Days Remaining</th>
          <th>Status</th>
        </tr>
        <div className={styles.content}>
          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Approve Timecards</td>
            <td>Timesheets</td>
            <td>Aaron Whitebird</td>
            <td>Aug 6th</td>
            <td>2</td>
            <td>
              <div className={styles.complete}>Complete</div>
            </td>
          </tr>
          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Review New Employees</td>
            <td>Employees</td>
            <td>Aaron Whitebird</td>
            <td>Aug 6th</td>
            <td>6</td>
            <td>
              <div className={styles.due}>Past Due</div>
            </td>
          </tr>
          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Approve Timecards</td>
            <td>Timesheets</td>
            <td>Aaron Whitebird</td>
            <td>Aug 8th</td>
            <td>1</td>
            <td>
              <div className={styles.complete}>Complete</div>
            </td>
          </tr>

          <tr className={`list-item--lg ${styles.columns}`}>
            <td>Approve Timecards</td>
            <td>Timesheets</td>
            <td>Aaron Whitebird</td>
            <td>Aug 8th</td>
            <td>1</td>
            <td>
              <div className={styles.complete}>Complete</div>
            </td>
          </tr>
        </div>
      </table>
    </TileContainer>
  );
};

export default TaskList;
