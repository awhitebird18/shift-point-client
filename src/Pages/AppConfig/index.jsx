import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// Styles
import styles from "./index.module.css";

// Components
import { Menu, Select } from "antd";
const { Option, OptGroup } = Select;
import TimesheetSetup from "./Timesheet";
import DepartmentSetup from "./Departments";
import EarningSetup from "./Earning";
import PositionSetup from "./Position";

const Settings = () => {
  const [current, setCurrent] = useState("Timesheet Setup");

  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleNavigation = (e) => {
    navigate(e);
  };

  return (
    <section className={styles.container}>
      <div className={styles.header}>{current}</div>
      <div className={styles.body}>
        <div className={styles.sideNav}>
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={["Timesheet Setup"]}
            mode="vertical"
            style={{ borderRight: "none" }}
          >
            <Menu.Item key="Timesheet Setup">
              <Link to="/app/settings/timesheet/rounding">Timesheet</Link>
            </Menu.Item>
            <Menu.Item key="Position Setup">
              <Link to="/app/settings/position">Positions</Link>
            </Menu.Item>
            <Menu.Item key="Department Setup">
              <Link to="/app/settings/department">Departments</Link>
            </Menu.Item>
            <Menu.Item key="Earning Setup">
              <Link to="/app/settings/earning">Earnings</Link>
            </Menu.Item>
          </Menu>
        </div>

        <div className={styles.mobileNav}>
          <h2>Navigation</h2>
          <Select onChange={handleNavigation}>
            <OptGroup label="Timesheet">
              <Option key="rounding" value="/app/settings/timesheet/rounding">
                Rounding
              </Option>
              <Option key="overtime" value="/app/settings/timesheet/overtime">
                Overtime
              </Option>
              <Option key="premium" value="/app/settings/timesheet/premium">
                Premiums
              </Option>
              <Option key="break" value="/app/settings/timesheet/breaks">
                Break Templates
              </Option>
              <Option
                key="shiftRule"
                value="/app/settings/timesheet/shiftrules"
              >
                Shift Rules
              </Option>
            </OptGroup>
            <OptGroup label="Positions">
              <Option key="position" value="/app/settings/position">
                Positions
              </Option>
            </OptGroup>
            <OptGroup label="Departments">
              <Option key="department" value="/app/settings/department">
                Departments
              </Option>
              <Option
                key="costCentre"
                value="/app/settings/department/costcentre"
              >
                Cost Centres
              </Option>
            </OptGroup>
            <OptGroup label="Earnings">
              <Option key="earning" value="/app/settings/earning">
                Earning List
              </Option>
            </OptGroup>
          </Select>
        </div>

        <div className={styles.content}>
          <Routes>
            <Route path="/timesheet/*" element={<TimesheetSetup />} />
            <Route path="/position" element={<PositionSetup />} />
            <Route path="/department/*" element={<DepartmentSetup />} />
            <Route path="/earning/*" element={<EarningSetup />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Settings;
