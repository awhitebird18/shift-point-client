import { useState } from "react";

// Styles
import styles from "./index.module.css";

// Components
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";

const ScheduleSetup = () => {
  const [current, setCurrent] = useState("rounding");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <div className={`hide-small ${styles.header}`}>
      <div>
        <Menu onClick={handleClick} selectedKeys={current} mode="horizontal">
          <Menu.Item key="rounding" icon={<MailOutlined />}>
            Rounding
          </Menu.Item>
          <Menu.Item key="overtime" icon={<MailOutlined />}>
            Overtime
          </Menu.Item>
          <Menu.Item key="premiums" icon={<MailOutlined />}>
            Premiums
          </Menu.Item>
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Shift Limits
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default ScheduleSetup;
