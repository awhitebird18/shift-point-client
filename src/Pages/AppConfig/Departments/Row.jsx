// React
import { useState } from "react";

// Styles
import styles from "./Departments.module.css";

// Components
import { Button, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { convertToOptionsArr } from "../../Timesheet/Functions/convertToOptions";

const DepartmentRow = ({
  department,
  isEditing,
  setIsEditing,
  setDepartmentList,
  costCentreList,
}) => {
  const [currentDepartment, setCurrentDepartment] = useState(department);

  const costCentreOptions = convertToOptionsArr(
    costCentreList,
    "Select Cost Centre"
  );
  const handleChange = (e) => {
    const type = e.target ? e.target.name : "costCentreId";
    const data = e.target ? e.target.value : e;

    setCurrentDepartment((prev) => {
      return { ...prev, [type]: data };
    });
  };

  // Set Whether Fields are Editable
  const inputFormField = (name) => {
    const value = currentDepartment[name];

    if (
      isEditing === currentDepartment._id ||
      isEditing === currentDepartment.tempId
    ) {
      return <Input name={name} onChange={handleChange} value={value} />;
    } else {
      return <div className={styles.departmentName}>{value}</div>;
    }
  };

  const selectFormField = () => {
    if (
      isEditing === currentDepartment._id ||
      isEditing === currentDepartment.tempId
    ) {
      return (
        <Select onChange={handleChange} value={currentDepartment.costCentreId}>
          {costCentreOptions}
        </Select>
      );
    } else {
      const costCentre = costCentreList.find((el) => {
        return el._id === currentDepartment.costCentreId;
      });

      return (
        <div className={styles.departmentName}>
          {costCentre ? costCentre.name : ""}
        </div>
      );
    }
  };

  // Set Button Save/ Edit
  const editField = () => {
    if (
      isEditing === currentDepartment._id ||
      isEditing === currentDepartment.tempId
    ) {
      return (
        <Button onClick={handleSave}>
          <SaveOutlined />
        </Button>
      );
    } else {
      return (
        <Button onClick={handleEdit}>
          <EditOutlined />
        </Button>
      );
    }
  };

  const handleEdit = () => {
    const id = currentDepartment._id
      ? currentDepartment._id
      : currentDepartment.tempId;

    setIsEditing(id);
  };

  // Handle Save
  const handleSave = () => {
    let url = `${process.env.REACT_APP_BASE_URL}department`;
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
          let index = prev.findIndex((el) => {
            return (
              (el._id ? el._id : el.tempId) ===
              (currentDepartment._id
                ? currentDepartment._id
                : currentDepartment.tempId)
            );
          });

          if (index !== -1) {
            prev.splice(index, 1, data.department);
          }

          return [...prev];
        });

        setIsEditing(false);
      });
  };

  const handleDelete = () => {
    if (!department._id) {
      return;
    }
    let url = `${process.env.REACT_APP_BASE_URL}department/${department._id}`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      cors: "no-cors",
    }).then(() => {
      setDepartmentList((prev) => {
        const index = prev.findIndex((el) => {
          return el._id === currentDepartment._id;
        });

        prev.splice(index, 1);

        return [...prev];
      });
    });
  };

  return (
    <div className={`list-item--md ${styles.columns}`}>
      {inputFormField("number")}
      {inputFormField("name")}
      {selectFormField("costCentre")}
      <div className={styles.center}>{editField()}</div>
      <div className={styles.center}>
        <Button onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default DepartmentRow;
