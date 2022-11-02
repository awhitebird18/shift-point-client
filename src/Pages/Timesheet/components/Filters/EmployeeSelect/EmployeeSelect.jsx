import { useState } from "react";
import { Select } from "antd";
import { convertToEmployeeOptions } from "../../Functions/convertToOptions";

const EmployeeSelect = ({ setTimesheetFilters, employeeData }) => {
  const [employeeFilter, setEmployeeFilter] = useState();

  // Employee Select Options
  const employeeSelectOptions = convertToEmployeeOptions(employeeData);

  // Employee on Change
  const employeeFilterOnChange = (e) => {
    setTimesheetFilters((prev) => {
      return { ...prev, employeeId: e };
    });
    setEmployeeFilter(e);
  };

  return (
    <Select
      value={employeeFilter}
      onChange={employeeFilterOnChange}
      style={{ width: "100%", maxWidth: "10rem" }}
      placeholder="All Employees"
    >
      {employeeSelectOptions}
    </Select>
  );
};

export default EmployeeSelect;
