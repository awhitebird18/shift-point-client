import { Collapse } from "antd";
import { Button } from "../../../../components";
const { Panel } = Collapse;
import Address from "./Address";
import PersonalInfo from "./PersonalInfo";
import Contact from "./Contact";
import Department from "./Department";
import Position from "./Position";
import styles from "./index.module.css";

const EmployeeInfo = ({ currentEmployee, setCurrentEmployee }) => {
  const handleSave = () => {
    setCurrentEmployee((prev) => {
      return { ...prev, save: true };
    });
  };

  return (
    <>
      <Collapse bordered={false} defaultActiveKey={["1"]} style={{ background: "none" }}>
        <Panel header="Personal Information" key="1">
          <PersonalInfo currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee} />

          <Address currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee} />
        </Panel>

        <Panel header="Contact Information" key="2" className={styles.panel}>
          <Contact currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee} />
        </Panel>

        <Panel header="Department Information" key="3" className={styles.panel}>
          <Department currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee} />
        </Panel>
        <Panel header="Position Information" key="4" className={styles.panel}>
          <Position currentEmployee={currentEmployee} setCurrentEmployee={setCurrentEmployee} />
        </Panel>
      </Collapse>
      <div className={styles.save} onClick={handleSave}>
        <Button
          type="primary"
          style={{
            margin: "2rem 1rem 1rem auto",
            height: "2.5rem",
            width: "5rem",
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default EmployeeInfo;
