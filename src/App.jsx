import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state";

// Pages
import Dashboard from "./pages/Dashboard";
import Timesheet from "./pages/Timesheet";
import Schedule from "./pages/Schedule";
import Settings from "./pages/AppConfig";
import Employees from "./pages/Employees";
import Users from "./pages/Users";
import Messaging from "./pages/Messaging";
import TaskList from "./pages/TaskList";

// Components
import SideNav from "./components/SideNav/SideNav";
import TopNav from "./components/TopNav/TopNav";
import { Layout } from "antd";
const { Sider } = Layout;

// Styles
import styles from "./App.module.css";

// Hooks
import { useFetch } from "./hooks";

const App = () => {
  const [user] = useFetch("/userAccounts/currentUser");

  const dispatch = useDispatch();

  const { setCurrentUser, fetchEmployees, fetchDataAxios } = bindActionCreators(actionCreators, dispatch);

  // Initial App Fetch
  useEffect(() => {
    setCurrentUser();
    fetchEmployees();
    fetchDataAxios("department");
    fetchDataAxios("costcentre");
    fetchDataAxios("module");
  }, []);

  if (!user) return null;

  return (
    <div>
      <TopNav user={user} />

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
            transition: "",
            background: "#fff",
            position: "fixed",
            top: "4rem",
            left: "0rem",
            height: "calc(100vh - 4rem)",
            zIndex: "5",
          }}
          className="site-layout-background"
          width={175}
          breakpoint="xl"
          collapsedWidth={50}
        >
          <SideNav user={user} />
        </Sider>

        <main className={`main--background ${styles.container}`}>
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
  );
};

export default App;
