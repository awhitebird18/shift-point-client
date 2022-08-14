import React from "react";

import styles from "./Notifications.module.css";

const Notification = ({ notifications }) => {
  return (
    <div className={styles.container}>
      {notifications.map((notification) => {
        return (
          <section className={styles.notification}>
            {notification.content}
          </section>
        );
      })}
    </div>
  );
};

export default Notification;
