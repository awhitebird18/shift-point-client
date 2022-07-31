// Styles
import styles from "./Summary.module.css";

// Components
import { Tag } from "antd";

// Functions
import { useFetch } from "../../../../Hooks";

const Summary = ({ currentUser }) => {
  const [departments] = useFetch("/department");
  const [costCentres] = useFetch("/costcentre");

  const assignedModules = [];

  for (const module in currentUser.moduleAccess) {
    if (currentUser.moduleAccess[module].access) {
      assignedModules.push(
        <Tag style={{ margin: "0.25rem" }} key={module}>{`${module
          .substring(0, 1)
          .toUpperCase()}${module.substring(1)}`}</Tag>
      );
    }
  }

  const departmentList =
    departments &&
    costCentres &&
    currentUser.departments
      .map((assignedDepartment) => {
        const department = departments.find((department) => {
          return department._id === assignedDepartment.id;
        });

        const costCentre = costCentres.find((costCentre) => {
          return costCentre._id === department.costCentreId;
        });

        return (
          <div
            key={assignedDepartment.id}
            className={`list-item--sm ${styles.columns}`}
          >
            <div>{department.number}</div>
            <div>{department.name}</div>
            <div>{costCentre?.name}</div>
          </div>
        );
      })
      .sort((a, b) => {
        return b.costCentreId - a.costCentreId;
      });

  return (
    <div className={styles.container}>
      <h2>Summary</h2>
      <div className={styles.section}>
        {departmentList ? (
          <>
            <h3 className={styles.sectionTitle}>Assigned Departments</h3>
            <div
              className={`list-header--sm ${styles.header} ${styles.columns}`}
            >
              <div>Number</div>
              <div>Name</div>
              <div>Cost Centre</div>
            </div>
            {departmentList}
          </>
        ) : (
          "No Assigned Departments"
        )}
      </div>
      <div className={styles.section}>
        {departmentList ? (
          <>
            <h3>Assigned Modules</h3>
            <div>{assignedModules}</div>
          </>
        ) : (
          "No Assigned Modules"
        )}
      </div>
    </div>
  );
};

export default Summary;
