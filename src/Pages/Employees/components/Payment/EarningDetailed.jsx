import { useState } from "react";
import { Form, Input, Select, DatePicker } from "antd";
const { Option } = Select;
import { Button } from "../../../../components";
import styles from "./Payment.module.css";
import moment from "moment";

const EarningDetailed = ({
  earning,
  earningList,
  currentEmployee,
  setCurrentEmployee,
  showModal,
}) => {
  const [currentEarning, setCurrentEarning] = useState(earning);

  const handleChange = (value, field) => {
    setCurrentEarning((prev) => {
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleCancel = () => {
    showModal(null);
  };

  const handleSave = () => {
    setCurrentEmployee((prev) => {
      const earningsCopy = [...prev.earnings];

      if (currentEarning._id) {
        const earningIndex = earningsCopy.findIndex((el) => {
          return el.earningId === currentEarning.earningId;
        });
        earningsCopy.splice(earningIndex, 1, currentEarning);
      } else {
        earningsCopy.push(currentEarning);
      }

      return { ...prev, earnings: earningsCopy, save: true };
    });
    setCurrentEarning(null);
    showModal(false);
  };

  const earningOptions = earningList.map((el, index) => {
    return (
      <Option key={index} value={el._id}>
        {el.name}
      </Option>
    );
  });

  earningOptions.unshift(<Option key="" value=""></Option>);

  const primaryEarningOptions = earningList
    .filter((el) => {
      return el.primary;
    })
    .map((el, index) => {
      return (
        <Option key={index} value={el._id}>
          {el.name}
        </Option>
      );
    });

  return (
    <Form layout="vertical">
      <Form.Item
        style={{ width: "75%", display: "inline-block" }}
        label="Earning Type"
      >
        <Select
          value={currentEarning.earningId}
          onChange={(e) => handleChange(e, "earningId")}
        >
          {currentEarning.primary ? primaryEarningOptions : earningOptions}
        </Select>
      </Form.Item>

      <Form.Item
        label="Rate"
        style={{
          width: "calc(25% - 1rem)",
          marginLeft: "1rem",
          display: "inline-block",
        }}
      >
        <Input
          value={currentEarning.rate}
          onChange={(e) => handleChange(e.target.value, "rate")}
        />
      </Form.Item>
      <Form.Item label="Effective From" style={{ width: "75%" }}>
        <DatePicker
          style={{ width: "100%" }}
          value={
            currentEarning.effectiveDate
              ? moment(currentEarning.effectiveDate)
              : ""
          }
          onChange={(date, dateString) =>
            handleChange(dateString, "effectiveDate")
          }
          format={"YYYY-MM-DD"}
        />
      </Form.Item>
      <div className={styles.formActions}>
        <Button onClick={handleCancel} type="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Form>
  );
};

export default EarningDetailed;
