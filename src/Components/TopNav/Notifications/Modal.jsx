import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

// Styles
import styles from "./Modal.module.css";

// Components
import { Divider } from "antd";

// Functions
import dayjs from "dayjs";
import { useClickOutside } from "../../../Hooks";

const Modal = ({ setShowAlerts, notifications }) => {
  const domNode = useClickOutside((x) => {
    setShowAlerts(x);
  });

  const dispatch = useDispatch();

  const { markAllAsRead, toggleRead } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const currentDate = dayjs().startOf("day");

  const generateNotifications = () => {
    const segmentsToDisplay = [];
    for (let i = 0; i <= 28; i++) {
      const notificationsForDate = notifications.filter((notification) => {
        return notification.time
          .startOf("day")
          .isSame(currentDate.subtract(i, "day"));
      });

      if (notificationsForDate.length > 0) {
        segmentsToDisplay.push(
          <div key={i}>
            <Divider orientation="left">
              {currentDate.subtract(i, "day").format("MMM DD YYYY")}
            </Divider>
            {notificationsForDate.map((notification, index) => {
              return (
                <div
                  className={styles.row}
                  key={index}
                  onClick={() => handleToggleRead(notification)}
                >
                  <div
                    className={styles.icon}
                    style={{
                      opacity: notification.unread ? "1" : "0",
                    }}
                  ></div>
                  <div className={styles.timeStamp}>
                    {dayjs(notification.time).format("h:mm a")} -
                  </div>
                  <div className={styles.message}>{notification.message}</div>
                </div>
              );
            })}
          </div>
        );
      }
    }

    return segmentsToDisplay;
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead(notifications);
  };

  const handleToggleRead = (notification) => {
    toggleRead(notification);
  };

  return (
    <section ref={domNode} className={styles.container}>
      <div className={styles.relativeContainer}>
        <div className={styles.notch}></div>
        <div className={styles.header}>
          <div className={styles.title}>Alerts</div>
          <div className={styles.dismiss} onClick={handleMarkAllAsRead}>
            Mark All As Read
          </div>
        </div>

        <div className={styles.content}>{generateNotifications()}</div>
      </div>
    </section>
  );
};

export default Modal;
