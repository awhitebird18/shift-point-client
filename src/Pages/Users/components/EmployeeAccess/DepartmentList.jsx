// Components
import { Checkbox } from "antd";

// Styles
import styles from "./DepartmentList.module.css";

const DepartmentList = ({
  currentUser,
  setCurrentUser,
  departments,
  costCentres,
}) => {
  const handleDepartmentChange = (e, department) => {
    setCurrentUser((prev) => {
      const departmentFound = prev.departments.find((el) => {
        return el.id === department;
      });

      if (departmentFound) {
        if (e.target.checked) {
          departmentFound.access = true;
          departmentFound.exceptions = [];
        } else {
          const index = prev.departments.findIndex((el) => {
            return el.id === department;
          });
          prev.departments.splice(index, 1);
        }

        return { ...prev };
      } else {
        const departmentsCopy = [...prev.departments];

        if (e.target.checked) {
          departmentsCopy.push({
            id: department,
            access: true,
            exceptions: [],
          });
        } else {
          departmentsCopy.push({
            id: department,
            access: false,
            exceptions: [],
          });
        }

        return { ...prev, departments: [...departmentsCopy] };
      }
    });
  };

  const departmentCheckboxes = departments
    .sort((a, b) => {
      return ("" + a.costCentreId).localeCompare(b.costCentreId);
    })
    .map((department) => {
      const departmentFound = currentUser.departments.find((el) => {
        return el.id === department._id;
      });

      const costCentre = costCentres.find((costCentre) => {
        return costCentre._id === department.costCentreId;
      });

      return (
        <div className={`list-item--md ${styles.columns}`} key={department._id}>
          <Checkbox
            checked={departmentFound && departmentFound.access ? true : false}
            onChange={(e) => handleDepartmentChange(e, department._id)}
            style={{ marginLeft: "1rem" }}
          />

          <div>{department.name}</div>
          <div>{costCentre?.name}</div>
        </div>
      );
    })
    .sort();
  return (
    <div>
      <div className={`list-header--md ${styles.columns}`}>
        <div>Access</div>
        <div>Department</div>
        <div>Cost Centre</div>
      </div>
      <div>{departmentCheckboxes}</div>
    </div>
  );
};

export default DepartmentList;
