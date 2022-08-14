import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../State/index.js";

// Styles
import styles from "./Info.module.css";

// Components
import { Dropdown, Menu } from "antd";
import { v4 as uuidv4 } from "uuid";

const MoreInfo = ({ timedata, breakdata, date, employee }) => {
  // Redux Actions
  const dispatch = useDispatch();

  // Redux Actions
  const { removeTimecard, addTimecard, showModal } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleShowExtended = () => {
    showModal({
      name: "EXTENDED_TIMECARD_DATA",
      title: "Extended Timecard",
      timecardId: timedata.id,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" style={{ height: "3rem" }}>
        <div
          onClick={() =>
            addTimecard({
              ...timedata,
              id: uuidv4(),
              _id: null,
              date,
              eeNum: employee.eeNum,
            })
          }
        >
          Add Timecard
        </div>
      </Menu.Item>

      <Menu.Item key="1" style={{ height: "3rem" }}>
        <div onClick={(e) => removeTimecard(timedata)} className="remove">
          {timedata.remove ? `Undo Remove` : "Remove Timecard"}
        </div>
      </Menu.Item>

      <Menu.Item key="2" style={{ height: "3rem" }}>
        <div onClick={handleShowExtended} className="remove">
          Extended Data
        </div>
      </Menu.Item>
    </Menu>
  );

  const iconStyles = `${styles.infoIcon} ${
    breakdata.length > 0 ? styles.infoIconActive : ""
  }`;

  const dotStyles = `${styles.dot} ${
    breakdata.length > 0 ? styles.dotActive : ""
  }`;

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      placement="bottomRight"
      arrow={true}
    >
      <div className={iconStyles}>
        <div className={dotStyles}></div>
        <div className={dotStyles}></div>
        <div className={dotStyles}></div>
        {timedata.premiums.length > 0 && (
          <div className={styles.premiumContainer}>
            <div className={styles.premiumIcon}>$</div>
          </div>
        )}
      </div>
    </Dropdown>
  );
};

export default MoreInfo;
