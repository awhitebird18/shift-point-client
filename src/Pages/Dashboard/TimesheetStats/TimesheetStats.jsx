import styles from "./TimesheetStats.module.css";
import axios from "axios";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../State";

import { BsArrowRight } from "react-icons/bs";

const TimesheetStats = ({}) => {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setTimesheetFilter } = actionCreators;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/timesheet/stats");

      setStats({ ...data.data });
    };

    fetchData();
  }, []);

  const handleViewSignedIn = () => {
    dispatch(
      setTimesheetFilter({
        type: "employee",
        subtype: "isSignedIn",
        active: true,
      })
    );

    navigate("/app/timesheet");
  };

  const handleViewSignedOut = () => {
    dispatch(
      setTimesheetFilter({
        type: "employee",
        subtype: "isSignedOut",
        active: true,
      })
    );

    navigate("/app/timesheet");
  };

  const handleViewMissingPunches = () => {
    dispatch(
      setTimesheetFilter({
        type: "employee",
        subtype: "isMissingPunches",
        active: true,
      })
    );

    navigate("/app/timesheet");
  };

  return (
    <div className={styles.tiles}>
      <section className={styles.container}>
        <h2 className={styles.count}>{stats ? stats.clockedIn : 0}</h2>

        <h3 className={styles.title}>Employees Clocked In</h3>

        <div className={styles.arrowIconWrapper} onClick={handleViewSignedIn}>
          <BsArrowRight className={styles.arrowIcon} />
        </div>
      </section>

      <section className={styles.container}>
        <h2 className={styles.count}>{stats ? stats.missedPunches : 0}</h2>

        <h3 className={styles.title}>Missed Punches</h3>

        <div
          className={styles.arrowIconWrapper}
          onClick={handleViewMissingPunches}
        >
          <BsArrowRight className={styles.arrowIcon} />
        </div>
      </section>

      <section className={styles.container}>
        <h2 className={styles.count}>
          {stats.clockedOut ? stats.clockedOut : 0}
        </h2>

        <h3 className={styles.title}>Employees Clocked Out</h3>

        <div className={styles.arrowIconWrapper} onClick={handleViewSignedOut}>
          <BsArrowRight className={styles.arrowIcon} />
        </div>
      </section>
    </div>
  );
};

export default TimesheetStats;
