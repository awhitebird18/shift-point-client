// Styles
import styles from "./Header.module.css";

import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Header = ({ timesheetRules, setValue, value }) => {
  const dayLookup = (j) => {
    switch (j) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";

      default:
        return "";
    }
  };

  let index = timesheetRules.startOfWeekIndex;
  const daysArr = [];
  for (let i = 0; i < 7; i++) {
    daysArr.push(dayLookup(index));

    index === 6 ? (index = 0) : index++;
  }

  const handleNext = () => {
    setValue((state) => {
      return state.add(1, "month");
    });
  };
  const handleBack = () => {
    setValue((state) => {
      return state.subtract(1, "month");
    });
  };

  return (
    <>
      <div className={styles.header}>
        <span className={styles.icon} onClick={handleBack}>
          <BsChevronDoubleLeft />
        </span>
        <div>{value.format("MMM YYYY")}</div>

        <span className={styles.icon} onClick={handleNext}>
          <BsChevronDoubleRight />
        </span>
      </div>
      <div className={styles.row}>
        {daysArr.map((day, index) => {
          return (
            <div key={index} className={`header-gray ${styles.dayHeader}`}>
              {day}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Header;
