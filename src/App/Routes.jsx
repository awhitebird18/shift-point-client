import { Route, Routes } from "react-router-dom";

// Components
import Login from "../Pages/Login";
import App from "../Pages";
import StatusErrorPage from "../Pages/ErrorHandling/StatusErrorPage";

// Styles
import "./css/index.css";
import "./css/app.scss";
import "./css/antdStylesOverride.css";
import "./css/timesheet.scss";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="error" element={<StatusErrorPage />} />

      <Route path="app/*" element={<App />} />
    </Routes>
  );
};

export default AppRoutes;
