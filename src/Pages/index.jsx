import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../State";

// Pages
import Dashboard from "./Dashboard";
import Timesheet from "./Timesheet";
import Schedule from "./Schedule";
import Settings from "./AppConfig";
import Employees from "./Employees";

import Users from "./Users";
import Messaging from "./Messaging";
import TaskList from "./TaskList";

// Components
import Overlay from "../Components/Overlay/Overlay";
import SideNav from "../Components/SideNav/SideNav";
import TopNav from "../Components/TopNav/TopNav";
import { Layout } from "antd";
const { Sider } = Layout;

// Styles
import styles from "./index.module.css";

// Functions
import { useFetch } from "../Hooks";

const Main = () => {
  const [user] = useFetch("/userAccounts/currentUser");
  let { isLoading } = useSelector((state) => {
    return state.uiData;
  });

  const dispatch = useDispatch();

  const { fetchEmployees, fetchData2, setCurrentUser } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    fetchEmployees();
    fetchData2("department");
    fetchData2("costcentre");
    setCurrentUser();
  }, []);

  return (
    <>
      {isLoading && <Overlay isLoading={isLoading} />}

      <div
        style={{
          minWidth: "100%",
          minHeight: "100%",
        }}
      >
        {user && <TopNav user={user} />}

        <div
          style={{
            position: "absolute",
            top: "4rem",
            minHeight: "calc(100% - 4rem)",
            minWidth: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Sider
            style={{
              transition: "all 0.3s ease",
              background: "#fff",
              position: "fixed",
              top: "4rem",
              left: "0rem",
              height: "100%",
              zIndex: "5",
            }}
            className="site-layout-background"
            width={175}
            breakpoint="xl"
            collapsedWidth={50}
          >
            {user && <SideNav user={user} />}
          </Sider>

          <main
            className={`main--background ${styles.container}`}
            style={{ flex: "1" }}
          >
            <Routes>
              <Route path="" element={<Dashboard />} />

              <Route path="timesheet" element={<Timesheet />} />

              <Route path="schedule" element={<Schedule />} />

              <Route path="employee/*" element={<Employees />} />

              <Route path="user/*" element={<Users />} />

              <Route path="settings/*" element={<Settings />} />
              <Route path="messaging/*" element={<Messaging />} />
              <Route path="tasklist/*" element={<TaskList />} />
            </Routes>
          </main>
        </div>
      </div>
    </>
  );
};

export default Main;
