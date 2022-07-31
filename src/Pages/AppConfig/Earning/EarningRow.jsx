import { useState } from "react";

// Styles
import styles from "./EarningList.module.css";

// Components
import { Button, Input, Checkbox, Select } from "antd";
const { Option } = Select;
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";

const EarningRow = ({ earning, isEditing, setIsEditing, setEarningList }) => {
  const [currentEarning, setCurrentEarning] = useState(earning);

  //   Handle Change
  const handleChange = (e, type) => {
    if (type) {
      setCurrentEarning((prev) => {
        return {
          ...prev,
          [type]: e,
        };
      });

      return;
    }

    setCurrentEarning((prev) => {
      return {
        ...prev,
        [e.target.name]:
          e.target.name === "overtimeEligible" || e.target.name === "primary"
            ? e.target.checked
            : e.target.value,
      };
    });
  };

  // Set Whether Fields are Editable
  const formFields = (name, select) => {
    const value = currentEarning[name];

    if (
      select &&
      (isEditing === currentEarning._id || isEditing === currentEarning.tempId)
    ) {
      const earningTypes = [
        "Regular",
        "Paid Leave",
        "Sick",
        "Premium",
        "Overtime",
      ];

      const earningTypeOptions = earningTypes.map((el) => {
        return <Option value={el}>{el}</Option>;
      });

      return (
        <Select
          name={name}
          onChange={(e) => handleChange(e, "type")}
          value={value}
          style={{ margin: "0" }}
        >
          {earningTypeOptions}
        </Select>
      );
    } else if (
      isEditing === currentEarning._id ||
      isEditing === currentEarning.tempId
    ) {
      return (
        <Input
          name={name}
          onChange={handleChange}
          value={value}
          style={{ margin: "0" }}
        />
      );
    } else {
      return <div className={styles.name}>{currentEarning[name]}</div>;
    }
  };

  const editField = () => {
    if (
      isEditing === currentEarning._id ||
      isEditing === currentEarning.tempId
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
    const id = currentEarning._id ? currentEarning._id : currentEarning.tempId;

    setIsEditing(id);
  };

  // Handle Save
  const handleSave = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/earning`;
    let method = currentEarning._id ? "PATCH" : "POST";

    if (method === "PATCH") {
      url = url.concat(`/${currentEarning._id}`);
    }

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",
      body: JSON.stringify({
        earning: currentEarning,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEarningList((prev) => {
          let index = prev.findIndex((el) => {
            return (
              (el._id ? el._id : el.tempId) ===
              (currentEarning._id ? currentEarning._id : currentEarning.tempId)
            );
          });

          if (index !== -1) {
            prev.splice(index, 1, data.earning);
          }

          return [...prev];
        });

        setIsEditing(false);
      });
  };

  // Handle Delete
  const handleDelete = () => {
    if (!earning._id) {
      return;
    }

    let url = `${process.env.REACT_APP_BASE_URL}earning/${earning._id}`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      cors: "no-cors",
    }).then(() => {
      setEarningList((prev) => {
        const index = prev.findIndex((el) => {
          return el._id === currentEarning._id;
        });

        prev.splice(index, 1);

        return [...prev];
      });
    });
  };

  return (
    <div className={`list-item--md ${styles.columns}`}>
      {formFields("name")}
      {formFields("type", true)}
      <div className="hide--tablet">{formFields("rate")}</div>
      <div className={`hide--tablet ${styles.icon}`}>
        <Checkbox
          name="overtimeEligible"
          checked={currentEarning.overtimeEligible}
          onChange={isEditing ? handleChange : ""}
          style={{ opacity: isEditing ? "100%" : "40%" }}
          defaultChecked="false"
        />
      </div>
      <div className={`hide--tablet ${styles.icon}`}>
        <Checkbox
          name="primary"
          checked={currentEarning.primary}
          onChange={isEditing ? handleChange : ""}
          style={{ opacity: isEditing ? "100%" : "40%" }}
          defaultChecked="false"
        />
      </div>

      <div className={styles.icon}>{editField()}</div>
      <div className={styles.icon}>
        <Button onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default EarningRow;
