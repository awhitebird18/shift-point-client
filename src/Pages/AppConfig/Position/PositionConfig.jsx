import { useState } from "react";

// Components
import { Input, Form, Select } from "antd";
const { Option } = Select;

import { Button } from "../../../Components";

import styles from "./PositionConfig.module.css";

const PositionConfig = ({
  position,
  departmentList,
  earningList,
  setPositionList,
  premiumList,
  showModal,
}) => {
  const [currentPosition, setCurrentPosition] = useState({ ...position });

  const handleCancel = () => {
    showModal(null);
  };

  const handleSave = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/position`;
    let method = currentPosition._id ? "PATCH" : "POST";

    if (method === "PATCH") {
      url = url.concat(`/${currentPosition._id}`);
    }

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",
      // Set employee here
      body: JSON.stringify({
        position: currentPosition,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPositionList((prev) => {
          if (method === "PATCH") {
            const index = prev.findIndex((el) => {
              return el._id === data.position._id;
            });

            prev.splice(index, 1, data.position);
          } else {
            prev.push(data.position);
          }

          return [...prev];
        });

        showModal(null);
      });
  };

  const departmentOptions = departmentList.map((el, index) => {
    return (
      <Option key={index} value={el._id}>
        {el.name}
      </Option>
    );
  });

  departmentOptions.unshift(<Option key="undefined" value=""></Option>);

  const earningOptions = earningList.map((el, index) => {
    return (
      <Option key={index} value={el._id}>
        {el.name}
      </Option>
    );
  });

  earningOptions.unshift(<Option key="undefined" value=""></Option>);

  const handlePrimary = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, primary: e.target.checked };
    });
  };

  const handleDepartment = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, departmentId: e };
    });
  };
  const handlePositionName = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, name: e.target.value };
    });
  };
  const handleEarning = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, earningId: e };
    });
  };

  const premiumOptions = premiumList.map((premium) => {
    return (
      <Option key={premium._id} value={premium._id}>
        {premium.name}
      </Option>
    );
  });

  const handleChange = (e) => {
    setCurrentPosition((prev) => {
      return { ...prev, premium: e };
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Position Name">
        <Input onChange={handlePositionName} value={currentPosition.name} />
      </Form.Item>

      <Form.Item>
        <Form.Item
          label="Department"
          style={{
            display: "inline-block",
            width: "200px",
            marginRight: "1rem",
          }}
        >
          <Select
            defaultValue=""
            onChange={handleDepartment}
            value={currentPosition.departmentId}
          >
            {departmentOptions && departmentOptions.length > 0
              ? departmentOptions
              : ""}
          </Select>
        </Form.Item>
        <Form.Item
          label="Earning"
          style={{ display: "inline-block", width: "200px" }}
        >
          <Select
            defaultValue=""
            onChange={handleEarning}
            value={currentPosition.earningId}
          >
            {earningOptions && earningOptions.length > 0 ? earningOptions : ""}
          </Select>
        </Form.Item>
      </Form.Item>

      <Form.Item label="Premiums">
        <Select
          mode="tags"
          style={{
            width: "100%",
          }}
          placeholder="Select Eligible Positions"
          onChange={handleChange}
          value={currentPosition.premium}
        >
          {premiumOptions}
        </Select>
      </Form.Item>

      <div className={styles.formActions}>
        <Button
          type="secondary"
          onClick={handleCancel}
          style={{ marginLeft: "auto" }}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Form>
  );
};

export default PositionConfig;
