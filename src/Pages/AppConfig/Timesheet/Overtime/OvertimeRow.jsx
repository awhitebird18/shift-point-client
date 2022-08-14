// Styles
import styles from "./Overtime.module.css";

// Components
import { Button } from "../../../../Components";

import dayjs from "dayjs";

const OvertimeRow = ({
  overtimeRule,
  showModal,
  setTimesheetRules,
  earningCodes,
}) => {
  const periodLengthDisplay = () => {
    if (!overtimeRule.periodLength) return "None";

    if (overtimeRule.periodLength === 1) return "Weekly";

    if (overtimeRule.periodLength === 2) return "BiWeekly";

    if (overtimeRule.periodLength === 4) return "Monthly";

    return `${overtimeRule.periodLength} Weeks`;
  };

  const handleEditOvertime = () => {
    showModal({
      name: "OVERTIME_CONFIG",
      title: "Edit Overtime Rule",
      overtime: overtimeRule,
      setTimesheetRules,
      earningCodes,
    });
  };

  const handleDeleteOvertime = (e) => {
    e.stopPropagation();

    setTimesheetRules((prev) => {
      const overtimeRules = [...prev.overtime];

      const overtimeIndex = overtimeRules.findIndex((el) => {
        return el._id === overtimeRule._id;
      });

      overtimeRules.splice(overtimeIndex, 1);

      return { ...prev, overtime: overtimeRules };
    });
  };

  return (
    <div
      className={`list-item--md ${styles.columns}`}
      onClick={handleEditOvertime}
    >
      <div>{overtimeRule.name}</div>
      <div>
        {overtimeRule.dailyThreshold1 ? overtimeRule.dailyThreshold1 : ""}
      </div>
      <div>
        {overtimeRule.periodThreshold ? overtimeRule.periodThreshold : ""}
      </div>
      <div className="hide--tablet">{periodLengthDisplay()}</div>
      <div className="hide--tablet">
        {dayjs(overtimeRule.periodStartDate, "MM/DD/YYYY").format(
          "MMM DD YYYY"
        )}
      </div>
      <div>
        <Button type="secondary" onClick={handleDeleteOvertime}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default OvertimeRow;
