// Styles
import styles from "./Alerts.module.css";

// Components
import { Timeline } from "antd";
import dayjs from "dayjs";

// Functions
import { useFetch } from "../../../Hooks";
import TileLayout from "../TileLayout/TileLayout";

const Alerts = () => {
  const [notifications] = useFetch("/notification");

  return (
    <TileLayout title="Alerts">
      <div className={styles.content}>
        <Timeline mode="left">
          {notifications?.map((notification, index) => {
            return (
              <Timeline.Item key={index}>
                <div className={styles.timeStamp}>
                  {dayjs(notification.time).format("MMM DD h:mm a")}
                </div>
                <div className={styles.message}>{notification.message}</div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      </div>
    </TileLayout>
  );
};

export default Alerts;
