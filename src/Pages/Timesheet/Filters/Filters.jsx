import { useState } from "react";
import { useSelector } from "react-redux";

// Styles
import styles from "./Filters.module.css";

// Components
import Main from "./Main/Main";
import Extended from "./Extended/Extended";

const Filters = ({
  dateRange,
  setDateRange,
  setTimesheetFilters,
  onSave,
  departments,
}) => {
  const [showExtendedFilters, setShowExtendedFilters] = useState(false);

  const { timesheetFilter } = useSelector((state) => {
    return state.filter;
  });

  return (
    <section className={styles.container}>
      <Main
        setDateRange={setDateRange}
        onSave={onSave}
        setShowExtendedFilters={setShowExtendedFilters}
        timesheetFilter={timesheetFilter}
        dateRange={dateRange}
      />

      {showExtendedFilters && (
        <Extended
          setTimesheetFilters={setTimesheetFilters}
          setShowExtendedFilters={setShowExtendedFilters}
          departments={departments}
          timesheetFilter={timesheetFilter}
        />
      )}
    </section>
  );
};

export default Filters;
