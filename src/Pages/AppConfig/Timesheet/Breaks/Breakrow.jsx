// Styles
import styles from "./Breaks.module.css";

// Components
import { Button } from "antd";

const Breakrow = ({
  breakEl,
  setTimesheetRules,
  setCurrentBreak,
  setModalIsVisible,
}) => {
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

  const handleShowBreakModal = () => {
    setCurrentBreak(breakEl);
    setModalIsVisible(true);
  };

  const handleDeleteTemplate = (e) => {
    e.stopPropagation();

    const url = `${process.env.REACT_APP_BASE_URL}timesheetrules/breaks/${breakEl._id}`;

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
      onClick={handleShowBreakModal}
    >
      <div>{breakEl.templateName}</div>
      <div>{breakCount}</div>
      <div>{unpaidMinutes}</div>
      <div>{paidMinutes}</div>

      <Button
        danger
        onClick={handleDeleteTemplate}
        className="hide--tablet"
        style={{ width: "min-content" }}
      >
        Delete Template
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
