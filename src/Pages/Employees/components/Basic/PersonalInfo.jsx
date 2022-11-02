import { Form, Input } from "antd";
import styles from "./index.module.css";

const PersonalInfo = ({ currentEmployee, setCurrentEmployee }) => {
  return (
    <div className={styles.formGrid111}>
      <Form.Item label="First Name">
        <Input
          name="firstName"
          type="text"
          onChange={(e) =>
            setCurrentEmployee((prev) => {
              return { ...prev, firstName: e.target.value };
            })
          }
          value={currentEmployee.firstName}
        />
      </Form.Item>
      <Form.Item label="Last Name">
        <Input
          name="lastName"
          onChange={(e) =>
            setCurrentEmployee((prev) => {
              return { ...prev, lastName: e.target.value };
            })
          }
          value={currentEmployee.lastName}
        />
      </Form.Item>
      <Form.Item label="Employee Number">
        <Input
          name="eeNum"
          onChange={(e) =>
            setCurrentEmployee((prev) => {
              return { ...prev, eeNum: e.target.value };
            })
          }
          value={currentEmployee.eeNum}
        />
      </Form.Item>
    </div>
  );
};

export default PersonalInfo;
