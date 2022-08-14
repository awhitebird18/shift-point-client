// Styles
import styles from "./Breaks.module.css";

// Components
import { Button } from "../../../../Components";

const Breakrow = ({ breakEl, setTimesheetRules, showModal }) => {
  const { paidMinutes, unpaidMinutes, breakCount } = breakEl.breaks.reduce(
    (prev, curr) => {
      return {
        paidMinutes: curr.unpaid
          ? prev.paidMinutes
          : prev.paidMinutes + curr.length,
        unpaidMinutes: curr.unpaid
          ? prev.unpaidMinutes + curr.length
          : prev.unpaidMinutes,
        breakCount: ++prev.breakCount,
      };
    },
    { paidMinutes: 0, unpaidMinutes: 0, breakCount: 0 }
  );

  const handleEditBreakTemplate = () => {
    showModal({
      name: "BREAK_TEMPLATE_CONFIG",
      title: "Edit Break Template",
      breakEl,
      setTimesheetRules,
    });
  };

  const handleDeleteTemplate = (e) => {
    e.stopPropagation();

    const url = `${process.env.REACT_APP_BASE_URL}/timesheetrules/breaks/${breakEl._id}`;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((data) => {
      setTimesheetRules((prev) => {
        return {
          ...prev,
          breakTemplates: prev.breakTemplates.filter((el) => {
            return el._id !== breakEl._id;
          }),
        };
      });
    });
  };

  return (
    <div
      className={`list-item--md ${styles.columns}`}
      onClick={handleEditBreakTemplate}
    >
      <div>{breakEl.templateName}</div>
      <div>{breakCount}</div>
      <div>{unpaidMinutes}</div>
      <div>{paidMinutes}</div>

      <Button
        type="secondary"
        onClick={handleDeleteTemplate}
        className="hide--tablet"
        style={{ width: "min-content" }}
      >
        Delete
      </Button>

      <Button
        danger
        onClick={handleDeleteTemplate}
        className="show--tablet"
        style={{ width: "min-content" }}
      >
        x
      </Button>
    </div>
  );
};

export default Breakrow;
