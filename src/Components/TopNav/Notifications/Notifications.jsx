import { useState, useEffect } from "react";
import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

// Components
import Modal from "./Modal";
import { BsBell } from "react-icons/bs";

// Styles
import styles from "./Notifications.module.css";

const Alerts = () => {
  const [showAlerts, setShowAlerts] = useState(false);
  const [unreadIcon, setUnreadIcon] = useState(false);

  const { notifications } = useSelector((state) => {
    return state.notification;
  });

  const dispatch = useDispatch();

  const { fetchNotifications } = bindActionCreators(actionCreators, dispatch);

  const handleShowAlerts = (e) => {
    setShowAlerts(true);
  };

  // Fetch Notifications
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle Unread Icon
  useEffect(() => {
    const unreadExist = notifications.some((notification) => {
      return notification.unread;
    });

    if (unreadExist) {
      setUnreadIcon(true);
    } else {
      setUnreadIcon(false);
    }
  }, [notifications]);

  return (
    <div className={styles.alerts}>
      <BsBell className={styles.bellIcon} onClick={handleShowAlerts} />

      {unreadIcon && <div className={styles.unreadIcon}></div>}
      {showAlerts && (
        <Modal setShowAlerts={setShowAlerts} notifications={notifications} />
      )}
    </div>
  );
};

export default Alerts;
