import { useState } from "react";
import { Checkbox, Form, Input, Select } from "antd";
import { Button } from "../../../Components";
import styles from "./EarningConfig.module.css";
import axios from "axios";

const EarningConfig = ({ setEarningList, earning, showModal }) => {
  const [currentEarning, setCurrentEarning] = useState({ ...earning });

  const handleChange = (value, field) => {
    setCurrentEarning((state) => {
      return { ...state, [field]: value };
    });
  };

  const handleCancel = () => {
    showModal(null);
  };

  const handleSave = async () => {
    let method = "post";

    if (currentEarning._id) {
      method = "patch";
    }

    const { data } = await axios[method](
      `/earning/${method === "patch" ? currentEarning._id : ""}`,
      currentEarning
    );

    setEarningList((state) => {
      const stateCopy = [...state];
      if (method === "patch") {
        const index = stateCopy.findIndex((el) => {
          return el._id === data.data._id;
        });

        if (index !== -1) {
          stateCopy.splice(index, 1, data.data);
        }
      } else {
        stateCopy.push(data.data);
      }

      return stateCopy;
    });

    showModal(null);
  };

  return (
    <Form style={{ maxWidth: "25rem" }}>
      <Form.Item style={{ marginBottom: "2rem" }}>
        <h3>Name</h3>
        <Input
          value={currentEarning.name}
          onChange={(e) => handleChange(e.target.value, "name")}
        />
      </Form.Item>

      <Form.Item
        style={{
          width: "calc(33% - 1rem)",
          marginRight: "1rem",
          display: "inline-block",
        }}
      >
        <h3>Global Rate</h3>
        <Input
          value={currentEarning.rate}
          onChange={(e) => handleChange(e.target.value, "rate")}
        />
      </Form.Item>

      <Form.Item
        style={{
          width: "calc(33% - 1rem)",
          marginRight: "1rem",
          marginBottom: "2rem",
          display: "inline-block",
        }}
      >
        <h3>Min Rate</h3>
        <Input
          value={currentEarning.minRate}
          onChange={(e) => handleChange(e.target.value, "minRate")}
        />
      </Form.Item>
      <Form.Item style={{ width: "33%", display: "inline-block" }}>
        <h3>Max Rate</h3>
        <Input
          value={currentEarning.maxRate}
          onChange={(e) => handleChange(e.target.value, "maxRate")}
        />
      </Form.Item>

      <Form.Item
        style={{
          width: "calc(50% - 1rem)",
          marginRight: "1rem",
          display: "inline-block",
        }}
      >
        <h3>Overtime Eligible?</h3>
        <Checkbox
          checked={currentEarning.overtimeEligible}
          onChange={(e) => handleChange(e.target.checked, "overtimeEligible")}
        />
      </Form.Item>

      <Form.Item style={{ width: "50%", display: "inline-block" }}>
        <h3>Primary Earning?</h3>
        <Checkbox
          checked={currentEarning.primary}
          onChange={(e) => handleChange(e.target.checked, "primary")}
        />
      </Form.Item>

      <div className={styles.formActions}>
        <Button
          type="secondary"
          style={{ marginLeft: "auto" }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Form>
  );
};

export default EarningConfig;
