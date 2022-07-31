import React from "react";

// Styles
import styles from "./TimesheetStats.module.css";

// Components
import { Statistic } from "antd";

// Functions
import { useFetch } from "../../../Hooks";
import TileLayout from "../TileLayout/TileLayout";

const TimesheetStats = ({}) => {
  const [timesheetDayStats] = useFetch("/timesheet/stats");

  return (
    <TileLayout title="Timesheet Stats">
      <div className={styles.container}>
        <Statistic
          title="Employees Clocked In"
          value={timesheetDayStats?.currentlyWorking}
          precision={0}
        />

        <Statistic
          title="Pay Period Approved"
          value={timesheetDayStats?.totalApprovedRecords}
          precision={0}
        />

        <Statistic
          title="Pay Period Pending"
          value={timesheetDayStats?.totalPendingRecords}
          precision={0}
        />

        <Statistic
          title="Missing Punches"
          value={timesheetDayStats?.missingPunches}
          precision={0}
        />
      </div>
    </TileLayout>
  );
};

export default TimesheetStats;
