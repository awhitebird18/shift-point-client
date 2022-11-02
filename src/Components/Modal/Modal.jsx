import { useEffect, useRef } from "react";
import { actionCreators } from "../../state";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

// Components
import Export from "../../pages/Timesheet/components/Export/Export";
import ManageSchedule from "../../pages/Schedule/components/ManageSchedule/ManageSchedule";
import PublishSchedule from "../../pages/Schedule/components/PublishSchedule/PublishSchedule";
import AddShift from "../../pages/Schedule/components/AddShift/AddShift";
import ManagePost from "../../pages/Dashboard/components/Bulletin/ManagePost";
import EarningDetailed from "../../pages/Employees/components/Payment/EarningDetailed";
import PositionDetailed from "../../pages/Employees/components/Position/PositionDetailed";
import ExtendedTimecard from "../../pages/Timesheet/components/ExtendedTimecard/ExtendedTimecard";
import OvertimeConfig from "../../pages/AppConfig/components/Timesheet/Overtime/OvertimeConfig";
import PremiumConfig from "../../pages/AppConfig/components/Timesheet/Premium/PremiumConfig";
import BreakTemplateConfig from "../../pages/AppConfig/components/Timesheet/Breaks/BreakTemplateConfig";
import PositionConfig from "../../pages/AppConfig/components/Position/PositionConfig";
import DepartmentConfig from "../../pages/AppConfig/components/Departments/DepartmentConfig";
import CostCentreConfig from "../../pages/AppConfig/components/CostCentres/CostCentreConfig";
import EarningConfig from "../../pages/AppConfig/components/Earning/EarningConfig";

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

      case "OVERTIME_CONFIG":
        return <OvertimeConfig {...props} showModal={showModal} />;

      case "PREMIUM_CONFIG":
        return <PremiumConfig {...props} showModal={showModal} />;

      case "BREAK_TEMPLATE_CONFIG":
        return <BreakTemplateConfig {...props} showModal={showModal} />;

      case "POSITION_CONFIG":
        return <PositionConfig {...props} showModal={showModal} />;

      case "DEPARTMENT_CONFIG":
        return <DepartmentConfig {...props} showModal={showModal} />;

      case "COSTCENTRE_CONFIG":
        return <CostCentreConfig {...props} showModal={showModal} />;

      case "EARNING_CONFIG":
        return <EarningConfig {...props} showModal={showModal} />;
    }
  }

  return (
    <>
      <div className={styles.modalOverlay} ref={domNode}>
        <main className={styles.modal} styles={{ ...props.styles }}>
          <div className={styles.header}>
            <h2 className={styles.title}>{props.title}</h2>
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
