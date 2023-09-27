import { useState, useEffect, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import styles from "./index.module.css";
import Rounding from "./Rounding/Rounding";
import Overtime from "./Overtime/Overtime";
import Premium from "./Premium/Premium";
import ShiftRules from "./ShiftRules/ShiftRules";
import Breaks from "./Breaks/Breaks";
import { Menu } from "antd";
import GenerateSchedule from "../GenerateSchedule/GenerateSchedule";

const TimesheetSetting = () => {
  const firstLoad = useRef(true);
  const [current, setCurrent] = useState("");
  const [timesheetRules, setTimesheetRules] = useState();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");

    setCurrent(pathSegments[pathSegments.length - 1]);
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/timesheetrules`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "GET",
      cors: "no-cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTimesheetRules(data.data);
      });
  }, []);

  // Save timesheet rules
  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return;
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/timesheetrules`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",
      cors: "no-cors",
      body: JSON.stringify(timesheetRules),
    });
  }, [timesheetRules]);

  return (
    <>
      <div className={styles.header}>
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
          <Menu.Item key="rounding">
            <Link to="/app/settings/timesheet/rounding">Rounding</Link>
          </Menu.Item>
          <Menu.Item key="overtime">
            <Link to="/app/settings/timesheet/overtime">Overtime</Link>
          </Menu.Item>
          <Menu.Item key="premium">
            <Link to="/app/settings/timesheet/premium">Premiums</Link>
          </Menu.Item>
          <Menu.Item key="breaks">
            <Link to="/app/settings/timesheet/breaks">Break Templates</Link>
          </Menu.Item>
          <Menu.Item key="shiftrules">
            <Link to="/app/settings/timesheet/shiftrules">Shift Rules</Link>
          </Menu.Item>
          <Menu.Item key="generateschedule">
            <Link to="/app/settings/timesheet/generateschedule">Generate Schedule</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        {timesheetRules && (
          <Routes>
            <Route
              path="/rounding"
              element={
                <Rounding timesheetRules={timesheetRules} setTimesheetRules={setTimesheetRules} />
              }
            />

            <Route
              path="/overtime"
              element={
                <Overtime timesheetRules={timesheetRules} setTimesheetRules={setTimesheetRules} />
              }
            />

            <Route path="/premium" element={<Premium />} />

            <Route
              path="/breaks"
              element={
                <Breaks
                  breakTemplates={timesheetRules.breakTemplates}
                  setTimesheetRules={setTimesheetRules}
                />
              }
            />
            <Route
              path="/shiftrules"
              element={
                <ShiftRules
                  shiftRulesTM={{ ...timesheetRules.shiftRules }}
                  setTimesheetRules={setTimesheetRules}
                />
              }
            />
            <Route path="/generateschedule" element={<GenerateSchedule />} />
          </Routes>
        )}
      </div>
    </>
  );
};

export default TimesheetSetting;
