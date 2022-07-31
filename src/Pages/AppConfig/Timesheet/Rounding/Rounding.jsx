// Components
import ScheduledRoundingSegment from "./ScheduledRoundingSegment";
import UnscheduledRoundingRow from "./UnscheduledRoundingRow";
import { Form } from "antd";

// Styles
import styles from "./Rounding.module.css";

const Rounding = ({ timesheetRules, setTimesheetRules }) => {
  return (
    <div className={styles.body}>
      {/* UNSCHEDULED PUNCHES */}
      <Form name="complex-form" layout="vertical">
        <div className={styles.container}>
          <h3>Unscheduled Punches</h3>

          <div className={styles.roundingGrid}>
            <div></div>
            <div>Rounding Type</div>
            <div>Rounding Unit</div>
            <UnscheduledRoundingRow
              timesheetRules={timesheetRules}
              setTimesheetRules={setTimesheetRules}
              type={"start"}
            />
            <UnscheduledRoundingRow
              timesheetRules={timesheetRules}
              setTimesheetRules={setTimesheetRules}
              type={"end"}
            />
          </div>
        </div>

        {/* SCHEDULED PUNCHES */}
        <div className={styles.container}>
          <h3>Scheduled Punches</h3>

          <div className={styles.scheduledGrid}>
            <ScheduledRoundingSegment
              timesheetRules={timesheetRules}
              setTimesheetRules={setTimesheetRules}
              punchTransaction={"Before Shift Start"}
              section={"beforeStart"}
            />
            <ScheduledRoundingSegment
              timesheetRules={timesheetRules}
              setTimesheetRules={setTimesheetRules}
              punchTransaction={"After Shift Start"}
              section={"afterStart"}
            />
            <ScheduledRoundingSegment
              timesheetRules={timesheetRules}
              setTimesheetRules={setTimesheetRules}
              punchTransaction={"Before Shift End"}
              section={"beforeEnd"}
            />
            <ScheduledRoundingSegment
              timesheetRules={timesheetRules}
              setTimesheetRules={setTimesheetRules}
              punchTransaction={"After Shift End"}
              section={"afterEnd"}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Rounding;
