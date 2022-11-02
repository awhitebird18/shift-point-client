import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../../state";
import { BsCheck, BsX, BsCalendar4Event, BsThreeDots } from "react-icons/bs";
import styles from "./Status.module.css";
import { updateStatus } from "../../Functions/timecardFunctions.js";

const StatusField = ({ timedata }) => {
  const dispatch = useDispatch();
  const { storeTimecard } = bindActionCreators(actionCreators, dispatch);

  function statusClasses() {
    if (timedata.remove) {
      return `${styles.status} ${styles["warning"]}`;
    } else {
      return `${styles.status} ${styles[timedata.status]}`;
    }
  }

  const updateTimecardStatus = () => {
    const updatedTimedata = updateStatus(timedata);

    storeTimecard(updatedTimedata);
  };

  const statusIcons = () => {
    switch (timedata.status) {
      case "pending":
        return <BsThreeDots />;
      case "approved":
        return <BsCheck />;
      case "scheduled":
        return <BsCalendar4Event />;

      default:
        return;
    }
  };

  return (
    <>
      {timedata.status ? (
        <button name="status" className={statusClasses()} onClick={(e) => updateTimecardStatus()}>
          <span className={`hide--tablet ${styles.text}`}>
            {!timedata.remove ? `${timedata.status.toString().toUpperCase()[0]}${timedata.status.toString().substring(1)}` : "Removed"}
          </span>

          <span className={`show--tablet ${styles.icon}`}>{!timedata.remove ? statusIcons() : <BsX />}</span>
        </button>
      ) : (
        ""
      )}
    </>
  );
};

export default StatusField;
