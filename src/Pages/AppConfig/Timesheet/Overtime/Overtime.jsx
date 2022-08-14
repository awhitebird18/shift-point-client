import { actionCreators } from "../../../../State";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// Styles
import styles from "./Overtime.module.css";

// Components
import { Button } from "../../../../Components";
import OvertimeRow from "./OvertimeRow";

// Functions
import { useFetch } from "../../../../Hooks";

const Overtime = ({ timesheetRules, setTimesheetRules }) => {
  const [earningCodes] = useFetch("/earning");

  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddOvertime = () => {
    showModal({
      name: "OVERTIME_CONFIG",
      title: "Create Overtime Rule",
      earningCodes,
      setTimesheetRules,
    });
  };

  return (
    <>
      <div className={`list-header--md ${styles.columns}`}>
        <div>Province</div>
        <div>Daily</div>
        <div>Period</div>
        <div className="hide--tablet">Period Length</div>
        <div className="hide--tablet">Period Start Date</div>
        <div>Delete</div>
      </div>
      <div className="slideUpAnimation">
        {timesheetRules?.overtime.map((overtimeRule) => {
          return (
            <OvertimeRow
              key={overtimeRule._id}
              overtimeRule={overtimeRule}
              showModal={showModal}
              earningCodes={earningCodes}
              setTimesheetRules={setTimesheetRules}
            />
          );
        })}
      </div>

      <Button
        type="primary"
        onClick={handleAddOvertime}
        style={{ margin: "2rem 1rem 1rem auto" }}
      >
        Add Overtime Rule
      </Button>
    </>
  );
};

export default Overtime;
