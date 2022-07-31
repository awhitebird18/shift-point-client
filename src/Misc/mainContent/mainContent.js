import React, { useState } from 'react';
import styles from './index.module.css';
import TopNav from '../../components/topNav';
import Main from '../../components/Timesheet/TimesheetMain.js';

const MainContent = ({ navClosed, isLoading, setIsLoading }) => {
  const currentTimestamp = new Date(Date.now());
  const currentYear = currentTimestamp.getFullYear();
  const currentMonth = currentTimestamp.getMonth();
  const currentDate = currentTimestamp.getDate();

  const [dateRange, setDateRange] = useState({
    start: new Date(currentYear, currentMonth, currentDate),
    end: new Date(currentYear, currentMonth, currentDate),
  });

  const [timesheetFilters, setTimesheetFilters] = useState({
    eeNum: null,
    department: [],
    costCenter: [],
  });

  return (
    <div className={`${styles.main} ${navClosed ? '' : styles.active}`}>
      <Main
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        dateRange={dateRange}
        setDateRange={setDateRange}
        timesheetFilters={timesheetFilters}
        setTimesheetFilters={setTimesheetFilters}
      />
    </div>
  );
};

export default MainContent;
