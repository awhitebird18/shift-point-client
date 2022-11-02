import { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import EmployeeInfo from "../Basic";
import EmployeePayment from "../Payment/Payment";
import Position from "../Position/Position";
import TimesheetRules from "../TimesheetRules/TimesheetRules";
import { Menu, Form, Select } from "antd";
const { Option } = Select;
import { useFetch } from "../../../../hooks";

const EmployeeForm = ({ currentEmployee, setCurrentEmployee }) => {
  const [current, setCurrent] = useState("basicinfo");
  const [departmentList] = useFetch("/department");
  const [earningList] = useFetch("/earning");

  const navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleSave = () => {
    if (!currentEmployee.save) {
      return;
    }
    let url = `${process.env.REACT_APP_BASE_URL}/employee`;
    let method = currentEmployee._id ? "PATCH" : "POST";

    if (method === "PATCH") {
      url = url.concat(`/${currentEmployee._id}`);
    }

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",
      body: JSON.stringify({
        employee: currentEmployee,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCurrentEmployee(data.employee);
      });
  };

  // Save On Employee Change
  useEffect(() => {
    handleSave();
  }, [currentEmployee]);

  const handleMenuChange = (e) => {
    navigate(e);
  };

  return (
    <div className={styles.container}>
      <div className={`hide--tablet ${styles.sideMenu}`}>
        <Menu
          onClick={handleClick}
          selectedKeys={current}
          mode="vertical"
          style={{ height: "100%", border: "none" }}
        >
          <Menu.Item key="basicinfo">
            <Link to="/app/employee">Basic Information</Link>
          </Menu.Item>
          <Menu.Item key="payment">
            <Link to="/app/employee/payment">Pay Information</Link>
          </Menu.Item>
          {currentEmployee._id && (
            <Menu.Item key="position">
              <Link to="/app/employee/position">Positions</Link>
            </Menu.Item>
          )}
          <Menu.Item key="timesheetrules">
            <Link to="/app/employee/timesheetrules">Timesheet Rules</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className={`show--tablet ${styles.mobileMenu}`}>
        <h2>Employee Navigation</h2>
        <Select
          onChange={handleMenuChange}
          defaultValue="/app/employee"
          style={{ width: "100%" }}
        >
          <Option value="/app/employee">Basic Information</Option>
          <Option value="/app/employee/payment">Pay Information</Option>
          <Option value="/app/employee/position">Positions</Option>
          <Option value="/app/employee/timesheetrules">Timesheet Rules</Option>
        </Select>
      </div>

      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        layout="vertical"
        style={{ marginTop: "1rem" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <EmployeeInfo
                currentEmployee={currentEmployee}
                setCurrentEmployee={setCurrentEmployee}
              />
            }
          />
          {earningList && (
            <Route
              path="/payment"
              element={
                <EmployeePayment
                  currentEmployee={currentEmployee}
                  setCurrentEmployee={setCurrentEmployee}
                  earningList={earningList}
                />
              }
            />
          )}
          <Route
            path="/position"
            element={
              <Position
                currentEmployee={currentEmployee}
                setCurrentEmployee={setCurrentEmployee}
                departmentList={departmentList}
                earningList={earningList}
              />
            }
          />
          <Route
            path="/timesheetrules"
            element={
              <TimesheetRules
                employeeTimesheetRules={currentEmployee?.timesheetrules}
                setCurrentEmployee={setCurrentEmployee}
              />
            }
          />
        </Routes>
      </Form>
    </div>
  );
};

export default EmployeeForm;
