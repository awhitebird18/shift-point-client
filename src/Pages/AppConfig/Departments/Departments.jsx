import { useState } from "react";

// Styles
import styles from "./Departments.module.css";

// Components
import DepartmentRow from "./Row";
import { Button } from "antd";

import { useFetch } from "../../../Hooks";

const Departments = () => {
  const [isEditing, setIsEditing] = useState("");
  const [departmentList, setDepartmentList] = useFetch("/department");
  const [costCentreList] = useFetch("/costcentre");

  const handleAddDepartment = () => {
    const tempId = Math.floor(Math.random() * 10000);
    setIsEditing(tempId);
    setDepartmentList((prev) => {
      prev.push({
        departmentName: "",
        departmentNumber: "",
        tempId,
      });

      return [...prev];
    });
  };

  return (
    <>
      <div>
        <div className={`list-header--md ${styles.columns}`}>
          <div className={styles.departmentName}>Number</div>
          <div className={styles.departmentName}>Deptartment Name</div>
          <div className={styles.departmentName}>Cost Centre</div>
          <div className={styles.button}>Edit</div>
          <div className={styles.button}>Delete</div>
        </div>

        <div className="slideUpAnimation">
          {departmentList && costCentreList
            ? departmentList.map((el, index) => {
                return (
                  <DepartmentRow
                    key={index}
                    department={el}
                    setDepartmentList={setDepartmentList}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    costCentreList={costCentreList}
                  />
                );
              })
            : "No Departments to show"}

          <div className={styles.addDepartment}>
            <Button type="primary" onClick={handleAddDepartment}>
              Add Department
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Departments;
