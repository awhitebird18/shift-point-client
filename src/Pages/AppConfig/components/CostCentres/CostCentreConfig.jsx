import { useState } from "react";
import { Form, Input } from "antd";
import { Button } from "../../../../components";
import styles from "./CostCentreConfig.module.css";

const CostCentreConfig = ({ costCentre, setCostCentreList, showModal }) => {
  const [currentCostCentre, setCurrentCostCentre] = useState({ ...costCentre });

  const handleCancel = () => {
    showModal(null);
  };

  const handleSave = () => {
    const method = costCentre._id ? "PATCH" : "POST";

    fetch(`${process.env.REACT_APP_BASE_URL}/costcentre/${method === "PATCH" ? costCentre._id : ""}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "Application/json",
      },
      method: method,
      body: JSON.stringify(currentCostCentre),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCostCentreList((prev) => {
          const costCentreListCopy = [...prev];

          const costCentreIndex = costCentreListCopy.findIndex((el) => {
            return el._id === data.data._id;
          });

          if (costCentreIndex !== -1) {
            costCentreListCopy.splice(costCentreIndex, 1, data.data);
          } else {
            costCentreListCopy.push(data.data);
          }

          return costCentreListCopy;
        });

        showModal(null);
      });
  };

  const handleChange = (value, field) => {
    setCurrentCostCentre((state) => {
      return { ...state, [field]: value };
    });
  };

  return (
    <div>
      <Form layout="vertical">
        <Form.Item>
          <Input value={currentCostCentre.number} onChange={(e) => handleChange(e.target.value, "number")} />
        </Form.Item>
        <Form.Item>
          <Input value={currentCostCentre.name} onChange={(e) => handleChange(e.target.value, "name")} />
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

export default CostCentreConfig;
