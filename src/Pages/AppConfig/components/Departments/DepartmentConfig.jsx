import { useState } from "react";
import { Form, Input, Select } from "antd";
import { Button } from "../../../../components";
import { convertToOptionsArr } from "../../../../functions/convertToOptionsArr";
import styles from "./DepartmentConfig.module.css";

const DepartmentConfig = ({ costCentreList, department, showModal, setDepartmentList }) => {
  const [currentDepartment, setCurrentDepartment] = useState({ ...department });

  const costCentreOptions = convertToOptionsArr(costCentreList, "Select Cost Centre");

  const handleChange = (value, field) => {
    setCurrentDepartment((state) => {
      return { ...state, [field]: value };
    });
  };

  // Handle Save
  const handleSave = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/department`;
    let method = currentDepartment._id ? "PATCH" : "POST";

    if (method === "PATCH") {
      url = url.concat(`/${currentDepartment._id}`);
    }

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",
      body: JSON.stringify({
        department: currentDepartment,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDepartmentList((prev) => {
          const stateCopy = [...prev];
          let index = stateCopy.findIndex((el) => {
            return (el._id ? el._id : el.tempId) === (currentDepartment._id ? currentDepartment._id : currentDepartment.tempId);
          });

          if (index !== -1) {
            stateCopy.splice(index, 1, data.department);
          } else {
            stateCopy.push(data.department);
          }

          return [...stateCopy];
        });

        showModal(null);
      });
  };

  const handleCancel = () => {
    showModal(null);
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item label="Department Number">
          <Input value={currentDepartment.number} onChange={(e) => handleChange(e.target.value, "number")} />
        </Form.Item>
        <Form.Item label="Department Name">
          <Input value={currentDepartment.name} onChange={(e) => handleChange(e.target.value, "name")} />
        </Form.Item>
        <Form.Item label="Cost Centre">
          <Select value={currentDepartment.costCentreId} onChange={(e) => handleChange(e, "costCentreId")}>
            {costCentreOptions}
          </Select>
        </Form.Item>

        <div className={styles.formActions}>
          <Button type="secondary" onClick={handleCancel} style={{ marginLeft: "auto" }}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </Form>
    </div>
  );
};

export default DepartmentConfig;
