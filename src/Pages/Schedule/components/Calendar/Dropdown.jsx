import styles from "./Dropdown.module.css";
import Dates from "./Dates/Dates";
import { useClickOutside } from "../../../../hooks";

const Dropdown = ({ timesheetRules, setIsOpen }) => {
  const domRef = useClickOutside(setIsOpen);
  return (
    <main className={styles.container} ref={domRef}>
      <Dates setIsOpen={setIsOpen} timesheetRules={timesheetRules} />
    </main>
  );
};

export default Dropdown;
