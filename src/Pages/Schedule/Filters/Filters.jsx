import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State/index.js";

// Styles
import styles from "./Filters.module.css";

// Components
import { Select } from "antd";
import Calendar from "../Calendar/Calendar";
const { Option } = Select;
import dayjs from "dayjs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const RangeSelector = () => {
  const schedules = useSelector((state) => {
    return state.schedule.schedules;
  });

  const currentWeek = useSelector((state) => {
    return state.schedule.currentWeek;
  });

  const currentSchedule = schedules.find((el) => {
    return el.current;
  });

  const dispatch = useDispatch();
  const { setCurrentSchedule, setCurrentWeek } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const scheduleOptions = schedules.map((schedule) => {
    return (
      <Option key={schedule._id} value={schedule._id}>
        {schedule.name}
      </Option>
    );
  });

  const handleScheduleChange = (scheduleId) => {
    const currentDate = dayjs().startOf("week");
    setCurrentSchedule(scheduleId);
    setCurrentWeek(currentDate);
  };

  const handleWeekChange = (direction) => {
    const updatedWeek =
      direction === "next"
        ? currentWeek.add(7, "day")
        : currentWeek.subtract(7, "day");

    setCurrentWeek(updatedWeek);
  };

  return (
    <div className={styles.container}>
      <Select
        value={currentSchedule?._id}
        placeholder="Select Schedule"
        style={{ minWidth: "10rem" }}
        onChange={(e) => handleScheduleChange(e)}
      >
        {scheduleOptions}
      </Select>

      <Calendar />

      <div className={styles.weekSelector}>
        <div
          className={styles.icon}
          onClick={() => {
            handleWeekChange("prev");
          }}
        >
          <BsChevronLeft />
        </div>
        <div
          className={styles.icon}
          onClick={() => {
            handleWeekChange("next");
          }}
        >
          <BsChevronRight />
        </div>
      </div>
    </div>
  );
};

export default RangeSelector;
