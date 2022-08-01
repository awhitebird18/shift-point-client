import React from "react";
import styles from "./TimesheetMiniStat.module.css";

import { BsArrowRight } from "react-icons/bs";

const TimesheetMiniStat = ({ title, icon: Icon, stat }) => {
  return (
    <section className={styles.container}>
      <span className={styles.count}>{stat}</span>

      <h2 className={styles.title}>{title}</h2>

      <div className={styles.arrowIconWrapper}>
        <BsArrowRight className={styles.arrowIcon} />
      </div>
    </section>
  );
};

export default TimesheetMiniStat;
