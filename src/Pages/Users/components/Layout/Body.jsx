import { useState } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Body.module.css";
import { Menu, Form, Select } from "antd";
const { Option } = Select;
import BasicInfo from "../BasicInfo/BasicInfo";
import EmployeeAccess from "../EmployeeAccess/EmployeeAccess.jsx";
import ModuleAccess from "../ModuleAccess/ModuleAccess.jsx";
import { Button } from "../../../../components";
import { toast } from "react-hot-toast";

const Body = ({ currentUser, setCurrentUser, setUserList }) => {
  const [current, setCurrent] = useState("basicinfo");

  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  // Handle Save
  const handleUserSave = () => {
    let method = currentUser._id ? "PATCH" : "POST";

    let url = `${process.env.REACT_APP_BASE_URL}/userAccounts`;

    if (method === "PATCH") {
      url = url.concat(`/${currentUser._id}`);
    }

    if (
      !(
        currentUser.firstName &&
        currentUser.lastName &&
        currentUser.username &&
        currentUser.email
      )
    ) {
      toast.error("Missing User Details");
      return;
    }

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: method,
      body: JSON.stringify({
        ...currentUser,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status === "fail") {
          toast.error(data.message);
          return;
        }
        setUserList((prev) => {
          const stateCopy = [...prev];

          const userIndex = stateCopy.findIndex((user) => {
            return user._id === currentUser._id;
          });

          if (userIndex === -1) {
            stateCopy.push(data.data);
          } else {
            stateCopy.splice(userIndex, 1, data.data);
          }

          return stateCopy;
        });

        setCurrentUser(data.data);
      });
  };

  const handleBack = () => {
    setCurrentUser();
  };

  const handleMenuSelect = (e) => {
    navigate(e);
  };

  return (
    <div className={styles.body}>
      {/* Side Nav */}
      <div className="hide--tablet">
        <Menu
          onClick={handleClick}
          selectedKeys={current}
          mode="vertical"
          style={{ height: "100%" }}
        >
          <Menu.Item key="basicinfo">
            <Link to="/app/user/">Basic Information</Link>
          </Menu.Item>
          <Menu.Item key="employee">
            <Link to="/app/user/employeeaccess">Employee Access</Link>
          </Menu.Item>
          <Menu.Item key="moduleaccess">
            <Link to="/app/user/moduleaccess">Module Access</Link>
          </Menu.Item>
        </Menu>
      </div>

      <div className={`show--tablet ${styles.mobileMenuSelect}`}>
        <h2>Employee Navigation</h2>
        <Select
          onChange={handleMenuSelect}
          className={styles.moduleMenuSelect}
          defaultValue="/app/user/"
          style={{ width: "100%" }}
        >
          <Option value="/app/user/">Basic Information</Option>
          <Option value="/app/user/employeeaccess">Employee Information</Option>
          <Option value="/app/user/moduleaccess">Module Information</Option>
        </Select>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <Form
          name="basic"
          autoComplete="off"
          layout="vertical"
          style={{ marginBottom: "1rem" }}
        >
          <Routes>
            <Route
              path="/"
              element={
                <BasicInfo
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  setUserList={setUserList}
                  handleBack={handleBack}
                />
              }
            />
            <Route
              path="/employeeaccess/*"
              element={
                <EmployeeAccess
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/moduleaccess"
              element={
                <ModuleAccess
                  moduleAccess={currentUser.moduleAccess}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
          </Routes>
        </Form>
        <div className={styles.formActions}>
          <Button
            type="secondary"
            style={{ marginLeft: "auto", width: "5rem" }}
            onClick={handleBack}
          >
            Back
          </Button>
          <Button
            type="primary"
            style={{ width: "5rem" }}
            onClick={handleUserSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Body;
