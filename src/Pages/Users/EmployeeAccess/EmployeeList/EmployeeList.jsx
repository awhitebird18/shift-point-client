// Components
import { Collapse, Typography } from "antd";
const { Text } = Typography;
const { Panel } = Collapse;
import EmployeePanel from "./EmployeePanel";

// Styles
import styles from "./EmployeeList.module.css";

const EmployeeList = ({
  departments,
  currentUser,
  setCurrentUser,
  employees,
  costCentres,
}) => {
  return (
    <Collapse bordered={false} style={{ background: "none" }}>
      {departments.map((department, index) => {
        const deptIndex = currentUser.departments.findIndex((el) => {
          return el.id === department._id;
        });

        if (deptIndex === -1) {
          return;
        }

        const costCentre = costCentres.find((costCentre) => {
          return costCentre._id === department.costCentreId;
        });

        const employeeCount = employees.reduce((prev, curr) => {
          if (curr.homeDepartment === department._id) {
            return (prev += 1);
          } else {
            return prev;
          }
        }, 0);

        return (
          <Panel
            header={`${department.name} (${employeeCount})`}
            extra={<Text type="secondary">{costCentre?.name}</Text>}
            key={index}
            className={styles.panel}
          >
            <EmployeePanel
              employees={employees}
              department={department}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default EmployeeList;
