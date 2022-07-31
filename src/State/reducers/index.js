import { combineReducers } from "redux";
import timeDataReducer from "./timeDataReducer.js";
import uiReducer from "./uiReducer.js";
import statusErrorReducer from "./statusErrorReducer.js";
import scheduleReducer from "./scheduleReducer.js";
import filterReducer from "./filterReducer.js";
import userActionsReducer from "./userActionsReducer.js";
import notificationReducer from "./notificationReducer.js";
import employeeReducer from "./employeeReducer.js";
import payrollReducer from "./payrollReducer.js";
import userReducer from "./userReducer.js";

const reducers = combineReducers({
  timedata: timeDataReducer,
  uiData: uiReducer,
  statusError: statusErrorReducer,
  filter: filterReducer,
  schedule: scheduleReducer,
  userActions: userActionsReducer,
  notification: notificationReducer,
  employee: employeeReducer,
  payroll: payrollReducer,
  user: userReducer,
});

export default reducers;
