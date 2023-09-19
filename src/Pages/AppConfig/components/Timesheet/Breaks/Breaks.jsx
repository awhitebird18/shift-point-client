import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../../state";
import Breakrow from "./Breakrow";
import { Button } from "../../../../../components";
import styles from "./Breaks.module.css";

const Breaks = ({ breakTemplates, setTimesheetRules }) => {
  const dispatch = useDispatch();

  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddBreakTemplate = () => {
    showModal({
      name: "BREAK_TEMPLATE_CONFIG",
      title: "Create Break Template",
      breakEl: { templateName: "", breaks: [{}] },
      setTimesheetRules,
    });
  };

  return (
    <>
      <div className={`list-header--md ${styles.columns}`}>
        <div>Name</div>
        <div>Break Count</div>
        <div>Unpaid Minutes</div>
        <div>Paid Minutes</div>
        <div>Delete</div>
      </div>

      <div>
        <div>
          {breakTemplates.length > 0 ? (
            breakTemplates.map((breakEl, index) => {
              return (
                <Breakrow
                  key={index}
                  breakEl={breakEl}
                  showModal={showModal}
                  setTimesheetRules={setTimesheetRules}
                />
              );
            })
          ) : (
            <div className={styles.row}>No Breaks Setup</div>
          )}
        </div>

        <div className={styles.addBreakTemplate}>
          <Button
            type="primary"
            onClick={handleAddBreakTemplate}
            style={{
              width: "max-content",
              padding: "0.5rem",
              whitespace: "no-wrap",
            }}
          >
            Add Break Template
          </Button>
        </div>
      </div>
    </>
  );
};

export default Breaks;
