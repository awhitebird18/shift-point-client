import { useState } from "react";
import { useSelector } from "react-redux";

// Styles
import styles from "./Filters.module.css";

// Components
import Main from "./Main/Main";
import Extended from "./Extended/Extended";

const Filters = ({ dateRange, setDateRange, onSave, departments }) => {
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

      <Extended
        setShowExtendedFilters={setShowExtendedFilters}
        departments={departments}
        timesheetFilter={timesheetFilter}
        showExtendedFilters={showExtendedFilters}
      />
    </section>
  );
};

export default Filters;
