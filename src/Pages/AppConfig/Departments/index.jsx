import { useState } from "react";
import { Link } from "react-router-dom";
import { Routes, Route } from "react-router";

// Styles
import styles from "./index.module.css";

// Components
import { Menu } from "antd";
import Departments from "./Departments";
import CostCentres from "../CostCentres/CostCentres";

const DepartmentSetup = () => {
  const [current, setCurrent] = useState("departmentList");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <div className={styles.header}>
        <Menu
          onClick={handleClick}
          selectedKeys={current}
          mode="horizontal"
          style={{ borderBottom: "none" }}
        >
          <Menu.Item key="departmentList">
            <Link to="">Department List</Link>
          </Menu.Item>
          <Menu.Item key="costCentre">
            <Link to="costcentre">Cost Centre</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Departments />} />
          <Route path="costcentre" element={<CostCentres />} />
        </Routes>
      </div>
    </>
  );
};

export default DepartmentSetup;
