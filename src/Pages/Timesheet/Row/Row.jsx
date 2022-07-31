// React & Redux
import React from "react";
import { useSelector, shallowEqual } from "react-redux";

// Styles
import styles from "./Row.module.css";

// Components
import PositionField from "../Fields/Position/Position";
import EarningField from "../Fields/Earning/Earning";
import TimeField from "../Fields/Time/Time";
import HoursField from "../Fields/Hours/Hours";
import StatusField from "../Fields/Status/Status";
import Info from "../Fields/Info/Info";
import RateField from "../Fields/Rate/Rate";

// Data, Functions
import { days, months } from "../../../Misc/timesheetUtils.js";

const TimecardRow = ({ timedata, employee, earningOptions, rowCount }) => {
  const breakdata = useSelector((state) => {
    return state.timedata.breaksheet.filter((breakdata) => {
      return breakdata.timesheet === timedata.id && !breakdata.remove;
    });
  }, shallowEqual);

  const timesheetrules = useSelector((state) => {
    return state.timedata.timesheetrules;
  });

  const dateDisplay = `${
    months[timedata.date.getMonth()]
  } ${timedata.date.getDate()}`;

  const timecardDisplay = {
    ...timedata,
    positionId: timedata.positionId ? timedata.positionId : "",
    departmentId: timedata.departmentId ? timedata.departmentId : "",
    earningId: timedata.earningId ? timedata.earningId : "",
    status: timedata.status ? timedata.status : "",
    remove: timedata.remove ? timedata.remove : "",
  };

  if (timedata.date.getDate() === 16 && employee.eeNum === 200) {
    timedata.premium = [
      { name: "Night", rate: 1, color: "#a0d911" },
      { name: "Lead Hand", rate: 2, color: "#faad14" },
      { name: "Covid", rate: 2, color: "#1890ff" },
    ];
  }

  return (
    <tr className="timecard row columns">
      <td className={`${styles.date}`}>
        <div className="hide--tablet">
          {rowCount === 0 &&
            `${days[timedata.date.getDay()].substring(0, 3)} ${dateDisplay}`}
        </div>

        <div className="show--tablet">{rowCount === 0 && `${dateDisplay}`}</div>
      </td>

      <td className={`hide--tablet ${styles.field}`}>
        <PositionField
          date={timedata.date}
          timedata={timedata}
          breakdata={breakdata}
          employee={employee}
          timesheetrules={timesheetrules}
        />
      </td>

      <td className={`hide--mobile ${styles.field}`}>
        <EarningField
          timedata={timedata}
          earningOptions={earningOptions}
          date={timedata.date}
          employee={employee}
        />
      </td>

      <td className={`${styles.field}`}>
        <TimeField
          timedata={timedata}
          breakdata={breakdata}
          type={"start"}
          timesheetrules={timesheetrules}
          employee={employee}
        />
      </td>

      <td className={styles.field}>
        <TimeField
          timedata={timedata}
          breakdata={breakdata}
          type={"end"}
          timesheetrules={timesheetrules}
          employee={employee}
        />
      </td>

      <td className={styles.field}>
        <HoursField timedata={timedata} breakdata={breakdata} />
      </td>

      <td className={`hide--medium ${styles.field}`}>
        <RateField timedata={timedata} />
      </td>

      <td className={styles.field}>
        <StatusField timedata={timedata} styles={styles.time} />
      </td>
      <td className={styles.field}>
        {timecardDisplay.id && (
          <Info
            timedata={timecardDisplay}
            breakdata={breakdata}
            date={timedata.date}
            employee={employee}
          />
        )}
      </td>
    </tr>
  );
};

export default React.memo(TimecardRow);
