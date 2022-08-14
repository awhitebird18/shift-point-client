import { Checkbox } from "antd";

// Styles
import styles from "./EmployeeList.module.css";

const EmployeeList = ({
  departments,
  currentUser,
  setCurrentUser,
  employees,
  costCentres,
}) => {
  const assignedDepartments = currentUser.departments;

  const filteredEmployees = employees.filter((employee) => {
    return assignedDepartments.find((department) => {
      return department.id === employee.homeDepartment;
    });
  });

  return (
    <div>
      <div className={`list-header--sm ${styles.columns}`}>
        <div>Name</div>
        <div>Department</div>
        <div>Cost Centre</div>
        <div>Pay Type</div>
      </div>
      {filteredEmployees.map((employee) => {
        const department = departments.find((department) => {
          return department._id === employee.homeDepartment;
        });

        const costCentre = costCentres.find((costCentre) => {
          return costCentre._id === department.costCentreId;
        });

        return (
          <div className={`list-item--sm ${styles.columns}`}>
            <div>{`${employee.firstName} ${employee.lastName}`}</div>
            <div>{department.name}</div>
            <div>{costCentre?.name}</div>
            <div>Hourly</div>
          </div>
        );
      })}
    </div>
  );
};

export default EmployeeList;
