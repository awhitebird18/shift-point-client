import { Form, Input, Select } from "antd";
const { Option } = Select;
import styles from "./index.module.css";

const Position = ({ currentEmployee, setCurrentEmployee }) => {
  return (
    <div className={styles.formGrid22}>
      <Form.Item label="Occupation">
        <Input
          name="occupation"
          type="text"
          onChange={(e) =>
            setCurrentEmployee((prev) => {
              return { ...prev, occupation: e.target.value };
            })
          }
          value={currentEmployee.occupation}
        />
      </Form.Item>

      <Form.Item label="Employment Type">
        <Select
          name="employmentType"
          type="text"
          onChange={(e) =>
            setCurrentEmployee((prev) => {
              return { ...prev, employmentType: e };
            })
          }
          value={currentEmployee.employmentType}
          defaultValue={currentEmployee.employmentType}
        >
          <Option value="partTime">Part Time</Option>
          <Option value="fullTime">Full Time</Option>
          <Option value="casual">Casual</Option>
          <Option value="volunteer">Volunteer</Option>
          <Option value="contract">Contract</Option>
        </Select>
      </Form.Item>
    </div>
  );
};

export default Position;
