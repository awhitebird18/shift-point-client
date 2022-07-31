// Components
import { Checkbox, Typography } from "antd";
const { Text } = Typography;

// Styles
import styles from "./EmployeePanel.module.css";

const EmployeeList = ({
  department,
  employees,
  currentUser,
  setCurrentUser,
}) => {
  const employeeCheckboxes = employees.map((employee, index) => {
    function isChecked(currentUser, employee) {
      const employeeDepartment = currentUser.departments.find((el) => {
        return el.id === employee.homeDepartment;
      });

      if (!employeeDepartment) {
        return false;
      }

      const employeeException = employeeDepartment.exceptions.findIndex(
        (el) => {
          return el === employee._id;
        }
      );

      if (employeeDepartment.access) {
        if (employeeException === -1) {
          return true;
        } else if (employeeException !== -1) {
          return false;
        }
      } else if (!employeeDepartment.access) {
        if (employeeException !== -1) {
          return true;
        } else {
          return false;
        }
      }
    }

    const handleEmployeeChange = (e, employee) => {
      setCurrentUser((prev) => {
        const departmentAccess = [...prev.departments];

        // Check to see if user has access to all of employees home department
        const departmentFound = departmentAccess.find((el) => {
          return el.id === e.target.employeeDepartment;
        });

        if (departmentFound) {
          // Department Found
          if (departmentFound.access) {
            if (e.target.checked) {
              const index = departmentFound.exceptions.findIndex((el) => {
                return el === employee;
              });

              departmentFound.exceptions.splice(index, 1);
            } else {
              departmentFound.exceptions.push(employee);
            }
          } else {
            if (e.target.checked) {
              departmentFound.exceptions.push(employee);
            } else {
              departmentFound.exceptions.filter((el) => {
                return el !== employee;
              });
            }
          }
        } else {
          // Department Not Found
          if (e.target.checked) {
            // Employee Checked
            departmentAccess.push({
              id: e.target.employeeDepartment,
              access: false,
              exceptions: [employee],
            });
          }
        }

        return { ...prev, departments: departmentAccess };
      });
    };

    return (
      <div className={styles.row} key={index}>
        <Checkbox
          employeeDepartment={employee.homeDepartment}
          key={employee._id}
          onChange={(e) => handleEmployeeChange(e, employee._id)}
          checked={isChecked(currentUser, employee)}
          style={{ margin: 0 }}
        />

        <div>{`${employee.firstName} ${employee.lastName}`}</div>
      </div>
    );
  });

  const employeeRow = employeeCheckboxes.filter((employee) => {
    return (
      employee.props.children[0].props.employeeDepartment === department._id
    );
  });

  return (
    <div>
      {employeeRow.length > 0 ? (
        employeeRow
      ) : (
        <Text type="secondary">No assigned employees</Text>
      )}
    </div>
  );
};

export default EmployeeList;
