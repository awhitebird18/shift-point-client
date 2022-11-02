import { Form, Select } from "antd";
import styles from "./index.module.css";
import { useFetch } from "../../../../hooks";
import { convertToOptionsArr } from "../../../../functions/convertToOptionsArr";

const Department = ({ currentEmployee, setCurrentEmployee }) => {
  const [departmentList] = useFetch("/department");
  const departmentOptions = convertToOptionsArr(departmentList);

  return (
    <div className={styles.formGrid22}>
      <Form.Item label="Home Department">
        <Select
          onChange={(e) =>
            setCurrentEmployee((prev) => {
              return { ...prev, homeDepartment: e };
            })
          }
          value={currentEmployee.homeDepartment}
        >
          {departmentOptions}
        </Select>
      </Form.Item>
    </div>
  );
};

export default Department;
