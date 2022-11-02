import { useState } from "react";
import { Form, Input, Select, Divider, DatePicker } from "antd";
const { Option, OptGroup } = Select;
import { Button } from "../../../../../components";
import styles from "./OvertimeConfig.module.css";
import moment from "moment";

const OvertimeConfig = ({
  overtime,
  earningCodes,
  setTimesheetRules,
  showModal,
}) => {
  const [currentOvertime, setCurrentOvertime] = useState({ ...overtime });
  const dateFormat = "MM/DD/YYYY";

  const handleSave = () => {
    setTimesheetRules((prev) => {
      const overtimeRuleIndex = prev.overtime.findIndex((el) => {
        return el._id === currentOvertime._id;
      });

      const overtimeRules = [...prev.overtime];

      if (overtimeRuleIndex === -1) {
        overtimeRules.push(currentOvertime);
      } else {
        overtimeRules.splice(overtimeRuleIndex, 1, currentOvertime);
      }

      return {
        ...prev,
        overtime: overtimeRules,
      };
    });

    showModal(null);
  };

  const handleCancel = () => {
    showModal(null);
  };

  const handleChange = (e, type) => {
    setCurrentOvertime((prev) => {
      return { ...prev, [type]: e };
    });
  };

  const earningOptions = earningCodes
    .filter((el) => {
      return el.type === "Overtime";
    })
    .map((el) => {
      return <Option value={el._id}>{el.name}</Option>;
    });

  return (
    <Form layout="vertical" className={styles.container}>
      <Form.Item label="Name">
        <Input
          value={currentOvertime.name}
          onChange={(e) => handleChange(e.target.value, "name")}
          style={{ width: "50%" }}
        />
      </Form.Item>

      <Divider style={{ marginTop: 0 }}>Daily Overtime</Divider>
      <Form.Item label="First Threshold">
        <Input.Group compact>
          <Input
            style={{
              display: "inline-block",
              width: "7rem",
            }}
            placeholder="Enter Hours"
            onChange={(e) => handleChange(e.target.value, "dailyThreshold1")}
            value={currentOvertime.dailyThreshold1}
          />
          <Select
            style={{
              display: "inline-block",
              width: "calc(100% - 8rem)",
              marginLeft: "1rem",
            }}
            placeholder="Select Earning"
            onChange={(e) => handleChange(e, "dailyThresholdEarningId1")}
            value={currentOvertime.dailyThresholdEarningId1}
          >
            {earningOptions}
          </Select>
        </Input.Group>
      </Form.Item>
      <Form.Item label="Second Threshold">
        <Input.Group compact>
          <Input
            style={{ display: "inline-block", width: "7rem" }}
            placeholder="Enter Hours"
            onChange={(e) => handleChange(e.target.value, "dailyThreshold2")}
            value={currentOvertime.dailyThreshold2}
          />
          <Select
            style={{
              display: "inline-block",
              width: "calc(100% - 8rem)",
              marginLeft: "1rem",
            }}
            placeholder="Select Earning"
            onChange={(e) => handleChange(e, "dailyThresholdEarningId2")}
            value={currentOvertime.dailyThresholdEarningId2}
          >
            {earningOptions}
          </Select>
        </Input.Group>
      </Form.Item>

      <Divider>Period Overtime</Divider>

      <Form.Item label="Period Threshold">
        <Input.Group compact>
          <Input
            style={{
              display: "inline-block",
              width: "7rem",
            }}
            placeholder="Enter Hours"
            onChange={(e) => handleChange(e.target.value, "periodThreshold")}
            value={currentOvertime.periodThreshold}
          />
          <Select
            style={{
              display: "inline-block",
              width: "calc(100% - 8rem)",
              marginLeft: "1rem",
            }}
            placeholder="Select Earning"
            onChange={(e) => handleChange(e, "periodThresholdEarningId")}
            value={currentOvertime.periodThresholdEarningId}
          >
            {earningOptions}
          </Select>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        <Form.Item
          label="Period Length"
          style={{
            display: "inline-block",
            width: "calc(50% - 0.5rem",
            marginRight: "1rem",
          }}
        >
          <Select
            onChange={(e) => handleChange(e, "periodLength")}
            value={currentOvertime.periodLength}
          >
            <OptGroup label="Weekly">
              <Option value={1}>Weekly</Option>
            </OptGroup>

            <OptGroup label="Averaging">
              <Option value={2}>2 Weeks</Option>
              <Option value={3}>3 Weeks</Option>
              <Option value={4}>4 Weeks</Option>
              <Option value={5}>5 Weeks</Option>
              <Option value={6}>6 Weeks</Option>
              <Option value={7}>7 Weeks</Option>
              <Option value={8}>8 Weeks</Option>
            </OptGroup>
          </Select>
        </Form.Item>

        <Form.Item
          label="Period Start Date"
          style={{ display: "inline-block", width: "calc(50% - 0.5rem" }}
        >
          <DatePicker
            style={{ width: "100%" }}
            onChange={(date) =>
              handleChange(date.format("MM/DD/YYYY"), "periodStartDate")
            }
            value={
              currentOvertime.periodStartDate
                ? moment(currentOvertime.periodStartDate, dateFormat)
                : ""
            }
            format={dateFormat}
          />
        </Form.Item>
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

export default OvertimeConfig;
