// Styles
import styles from "./Dropdown.module.css";

import Dates from "./Dates/Dates";
import { useClickOutside } from "../../../Hooks";

const Dropdown = ({ timesheetRules, setIsOpen }) => {
  const domRef = useClickOutside(setIsOpen);
  return (
    <main className={styles.container} ref={domRef}>
      <Dates setIsOpen={setIsOpen} timesheetRules={timesheetRules} />
    </main>
  );
};

export default Dropdown;
