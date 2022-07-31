import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State";

// Styles
import styles from "./ModuleHeader.module.css";

// Components
import { Button } from "../../../Components";

const ModuleHeader = () => {
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handlePublish = (e) => {
    e.stopPropagation();
    showModal({ name: "PUBLISH_SCHEDULE" });
  };

  const handleManage = (e) => {
    e.stopPropagation();
    showModal({ name: "MANAGE_SCHEDULE" });
  };

  return (
    <div className={styles.headerTitle}>
      <div className={styles.title}>Scheduler</div>
      <div className={styles.scheduleOptions}>
        <Button
          type="secondary"
          className={`${styles.manage} ${styles.icon}`}
          onClick={handleManage}
        >
          Manage
        </Button>
        <Button
          className={`${styles.publish} ${styles.icon}`}
          onClick={handlePublish}
        >
          Publish
        </Button>
      </div>
    </div>
  );
};

export default ModuleHeader;
