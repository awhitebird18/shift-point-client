// React
import { useState, useEffect, useRef } from 'react';

// Components
import TimecardRow from '../components/timesheet/main/timecard/row/TimecardRow.js';

const Timecard = ({
  date,
  index,
  employee,
  departments,
  addNewTimesheet,
  generateAutoBreaks,
  timesheetData,
  setTimesheetData,
  breaksheetData,
  setBreaksheetData,
  setTriggerDailyOT,
  setUnsavedChanges,
  earningCodes,
  multiStyle,
  positionOptions,
  departmentOptions,
  earningOptions,
  tableCols,
}) => {
  const [triggerCalc, setTriggerCalc] = useState(false);
  const [triggerBreakAdjust, setTriggerBreakAdjust] = useState(false);
  const firstUpdate = useRef(true);

  // Generate Auto Breaks
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (
      Object.prototype.toString.call(timesheetData.start) !== '[object Date]' ||
      Object.prototype.toString.call(timesheetData.end) !== '[object Date]'
    ) {
      return;
    }

    generateAutoBreaks();
  }, [triggerCalc]);

  return (
    <>
      <TimecardRow
        date={date}
        index={index}
        employee={employee}
        departments={departments}
        setTriggerCalc={setTriggerCalc}
        setTriggerBreakAdjust={setTriggerBreakAdjust}
        addNewTimesheet={addNewTimesheet}
        timesheetData={timesheetData}
        breaksheetData={breaksheetData}
        setTimesheetData={setTimesheetData}
        setBreaksheetData={setBreaksheetData}
        setTriggerDailyOT={setTriggerDailyOT}
        setUnsavedChanges={setUnsavedChanges}
        earningCodes={earningCodes}
        multiStyle={multiStyle}
        positionOptions={positionOptions}
        departmentOptions={departmentOptions}
        earningOptions={earningOptions}
        tableCols={tableCols}
      />
    </>
  );
};

export default Timecard;
