import { useState } from "react";

// Styles
import styles from "./Overtime.module.css";

// Components
import { Button } from "antd";
import OvertimeRow from "./OvertimeRow";
import OvertimeModal from "./OvertimeModal";

// Functions
import { useFetch } from "../../../../Hooks";

const Overtime = ({ timesheetRules, setTimesheetRules }) => {
  const [currentOvertime, setCurrentOvertime] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [earningCodes] = useFetch("/earning");

  const handleAddOvertime = () => {
    setCurrentOvertime({});
    setModalOpen(true);
  };

  return (
    <>
      <div className={`list-header--md ${styles.columns}`}>
        <div>Province</div>
        <div>Daily Threshold</div>
        <div>Period Threshold</div>
        <div className="hide--tablet">Period Length</div>
        <div className="hide--tablet">Period Start Date</div>
        <div>Delete</div>
      </div>
      <div className="slideUpAnimation">
        {timesheetRules.overtime.map((overtimeRule) => {
          return (
            <OvertimeRow
              key={overtimeRule._id}
              overtimeRule={overtimeRule}
              setCurrentOvertime={setCurrentOvertime}
              setModalOpen={setModalOpen}
              setTimesheetRules={setTimesheetRules}
            />
          );
        })}
      </div>

      <div className={styles.addOvertimeRule}>
        <Button type="primary" onClick={handleAddOvertime}>
          Add Overtime Rule
        </Button>
      </div>

      {modalOpen && currentOvertime && (
        <OvertimeModal
          modalOpen={modalOpen}
          currentOvertime={currentOvertime}
          setCurrentOvertime={setCurrentOvertime}
          earningCodes={earningCodes}
          setTimesheetRules={setTimesheetRules}
        />
      )}
    </>
  );
};

export default Overtime;
