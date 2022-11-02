// React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import { store } from "./state/store.js";

// Components
import Routes from "./Routes";

// Axios Config
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");

// Global Styles
import "./css/index.css";
import "./css/app.scss";
import "./css/antdStylesOverride.css";
import "./css/timesheet.scss";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
