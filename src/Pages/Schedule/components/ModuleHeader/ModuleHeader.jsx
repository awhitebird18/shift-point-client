import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state";
import styles from "./ModuleHeader.module.css";
import { Button } from "../../../../components";

const ModuleHeader = () => {
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handlePublish = (e) => {
    e.stopPropagation();
    showModal({ name: "PUBLISH_SCHEDULE", title: "Publish Schedule" });
  };

  const handleManage = (e) => {
    e.stopPropagation();
    showModal({ name: "MANAGE_SCHEDULE", title: "Manage Schedule" });
  };

  return (
    <div className={styles.headerTitle}>
      <h1 className={styles.title}>Scheduler</h1>
      <div className={styles.scheduleOptions}>
        <Button
          type="secondary"
          className={styles.button}
          onClick={handleManage}
        >
          Manage
        </Button>
        <Button className={styles.button} onClick={handlePublish}>
          Publish
        </Button>
      </div>
    </div>
  );
};

export default ModuleHeader;
