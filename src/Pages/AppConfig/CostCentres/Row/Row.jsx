import { useState } from "react";

// Components
import { Button, Input } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";

// Styles
import styles from "../CostCentres.module.css";

const Row = ({ costCentre, setCostCentreList }) => {
  const [isEditing, setIsEditing] = useState(!costCentre._id);

  const handleDelete = () => {
    if (!costCentre._id) {
      setCostCentreList((prev) => {
        return prev.filter((el) => {
          return el._id;
        });
      });

      return;
    }

    fetch(`${process.env.REACT_APP_BASE_URL}costcentre/${costCentre._id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      if (res.status === 204) {
        setCostCentreList((prev) => {
          return prev.filter((el) => {
            return el._id !== costCentre._id;
          });
        });
      }
    });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const method = costCentre._id ? "PATCH" : "POST";

    fetch(
      `${process.env.REACT_APP_BASE_URL}costcentre/${
        method === "PATCH" ? costCentre._id : ""
      }`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "Application/json",
        },
        method: method,
        body: JSON.stringify(costCentre),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCostCentreList((prev) => {
          const costCentreListCopy = [...prev];

          const costCentreIndex = costCentreListCopy.findIndex((el) => {
            return el._id === data.data._id;
          });

          if (costCentreIndex === -1) {
            const index = costCentreListCopy.findIndex((el) => {
              return !el._id;
            });

            costCentreListCopy.splice(index, 1, data.data);
          } else {
            costCentreListCopy.splice(costCentreIndex, 1, data.data);
          }

          return costCentreListCopy;
        });
        setIsEditing(false);
      });
  };

  const handleChange = (e) => {
    setCostCentreList((prev) => {
      const costCentreListCopy = [...prev];

      const costCentreFound = costCentreListCopy.find((el) => {
        return el._id === costCentre._id;
      });

      if (!costCentreFound) {
        costCentreFound = costCentreListCopy.find((el) => {
          return !el._id;
        });

        costCentreFound[e.target.name] = e.target.value;
      } else {
        costCentreFound[e.target.name] = e.target.value;
      }

      return costCentreListCopy;
    });
  };

  return (
    <div className={`list-item--md ${styles.columns}`}>
      {isEditing ? (
        <Input
          name="number"
          value={costCentre.number}
          onChange={handleChange}
        />
      ) : (
        <div className={styles.departmentName}>{costCentre.number}</div>
      )}
      {isEditing ? (
        <Input name="name" value={costCentre.name} onChange={handleChange} />
      ) : (
        <div className={styles.departmentName}>{costCentre.name}</div>
      )}

      <Button
        onClick={isEditing ? handleSave : handleEdit}
        style={{ justifySelf: "start" }}
      >
        {isEditing ? <SaveOutlined /> : <EditOutlined />}
      </Button>

      <Button onClick={handleDelete} style={{ justifySelf: "start" }}>
        <DeleteOutlined />
      </Button>
    </div>
  );
};

export default Row;
