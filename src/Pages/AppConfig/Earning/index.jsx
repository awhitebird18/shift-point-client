import { useState } from "react";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";

// Styles
import styles from "./index.module.css";

// Components
import { Menu } from "antd";
import EarningList from "./EarningList";

const EarningSetup = () => {
  const [current] = useState("earningList");

  return (
    <>
      <div className={`hide--medium ${styles.header}`}>
        <Menu
          selectedKeys={current}
          mode="horizontal"
          style={{ borderBottom: "none" }}
        >
          <Menu.Item key="earningList">
            <Link to="">Earning List</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Routes>
          <Route path="/" element={<EarningList />} />
        </Routes>
      </div>
    </>
  );
};

export default EarningSetup;
