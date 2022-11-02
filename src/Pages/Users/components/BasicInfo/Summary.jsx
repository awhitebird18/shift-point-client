import { useSelector } from "react-redux";
import styles from "./Summary.module.css";
import { Tag } from "antd";
import { useFetch } from "../../../../hooks";

const Summary = ({ currentUser }) => {
  const [departments] = useFetch("/department");
  const [costCentres] = useFetch("/costcentre");

  const { module: moduleList } = useSelector((state) => {
    return state.payroll;
  });

  const assignedModules = [];

  for (const module in currentUser.moduleAccess) {
    if (currentUser.moduleAccess[module].access) {
      const moduleDetails = moduleList.find((el) => {
        return el._id === currentUser.moduleAccess[module].moduleId;
      });

      assignedModules.push(
        <Tag
          style={{ margin: "0.25rem" }}
          key={currentUser.moduleAccess[module].moduleId}
        >{`${moduleDetails.name
          .substring(0, 1)
          .toUpperCase()}${moduleDetails.name.substring(1)}`}</Tag>
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
            style={{ cursor: "auto" }}
          >
            <div>{department?.number}</div>
            <div>{department?.name}</div>
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
