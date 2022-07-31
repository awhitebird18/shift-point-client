import { useEffect, useRef } from "react";
import { actionCreators } from "../../State";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import Export from "../../Pages/Timesheet/Export/Export";
import ManageSchedule from "../../Pages/Schedule/ManageSchedule/ManageSchedule";
import PublishSchedule from "../../Pages/Schedule/PublishSchedule/PublishSchedule";
import AddShift from "../../Pages/Schedule/AddShift/AddShift";
import ManagePost from "../../Pages/Dashboard/Bulletin/ManagePost";
import EarningDetailed from "../../Pages/Employees/Payment/EarningDetailed";
import PositionDetailed from "../../Pages/Employees/Position/PositionDetailed";
import ExtendedTimecard from "../../Pages/Timesheet/ExtendedTimecard/ExtendedTimecard";

// Styles
import styles from "./Modal.module.css";

const Modal = (props) => {
  const domNode = useRef();
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    const handleClick = (e) => {
      if (domNode.current === e.target) {
        handleClose();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  function handleClose() {
    showModal(null);
  }

  function renderModalContent() {
    switch (props.name) {
      case "TIMESHEET_EXPORT":
        return <Export showModal={showModal} />;

      case "MANAGE_SCHEDULE":
        return <ManageSchedule />;

      case "PUBLISH_SCHEDULE":
        return <PublishSchedule />;

      case "MANAGE_SHIFT":
        return <AddShift {...props} />;

      case "MANAGE_POST":
        return <ManagePost {...props} showModal={showModal} />;

      case "EARNING_DETAILED":
        return <EarningDetailed {...props} showModal={showModal} />;

      case "EMPLOYEE_POSITION_DETAILED":
        return <PositionDetailed {...props} showModal={showModal} />;

      case "EXTENDED_TIMECARD_DATA":
        return <ExtendedTimecard {...props} showModal={showModal} />;
    }
  }

  return (
    <>
      <div className={styles.modalOverlay} ref={domNode}>
        <main className={styles.modal}>
          <div className={styles.header}>
            <h2 className={styles.title}>{props.name}</h2>
            <div className={styles.close} onClick={handleClose}>
              &#10005;
            </div>
          </div>

          <div className={styles.content}>{renderModalContent()}</div>
        </main>
      </div>
    </>
  );
};

export default Modal;
