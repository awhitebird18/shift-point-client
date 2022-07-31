import { useState } from "react";

// Styles
import styles from "./ShiftRules.module.css";

// Components
import { Form, Input, Radio, Divider } from "antd";

// Functions
import useDebounce from "../../../../Hooks/useDebounce";

const ShiftRules = ({ shiftRulesTM, setTimesheetRules }) => {
  const [shiftRules, setShiftRules] = useState(shiftRulesTM);
  const options = ["Warning", "Enforce"];
  const endOfDayOptions = ["Warning", "None"];

  useDebounce(() => handleSaveToDB(), 1000, [shiftRules]);

  const handleChange = (e, type) => {
    setShiftRules((prev) => {
      return { ...prev, [type]: e };
    });
  };

  const handleSaveToDB = () => {
    setTimesheetRules((prev) => {
      return { ...prev, shiftRules: { ...shiftRules } };
    });
  };

  return (
    <div>
      <Form layout="vertical">
        <Divider orientation="left">Shift Limits</Divider>
        <div className={styles.container}>
          <Form.Item>
            <Form.Item label="Min Hours" style={{ display: "inline-block" }}>
              <Input
                name="minShiftLength"
                value={shiftRules?.minShiftLength}
                style={{ width: "5rem", marginRight: "1rem" }}
                onChange={(e) => handleChange(e.target.value, "minShiftLength")}
              />
            </Form.Item>
            <Form.Item
              label="Min Shift Handling"
              style={{ display: "inline-block" }}
            >
              <Radio.Group
                options={options}
                onChange={(e) =>
                  handleChange(e.target.value, "minShiftHandling")
                }
                value={shiftRules?.minShiftHandling}
                optionType="button"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item className={styles.container}>
            <Form.Item label="Max Hours" style={{ display: "inline-block" }}>
              <Input
                value={shiftRules?.maxShiftLength}
                style={{ width: "5rem", marginRight: "1rem" }}
                onChange={(e) => handleChange(e.target.value, "maxShiftLength")}
              />
            </Form.Item>
            <Form.Item
              label="Max Shift Handling"
              style={{ display: "inline-block" }}
            >
              <Radio.Group
                options={options}
                onChange={(e) =>
                  handleChange(e.target.value, "maxShiftHandling")
                }
                value={shiftRules?.maxShiftHandling}
                optionType="button"
              />
            </Form.Item>
          </Form.Item>
        </div>
        <Divider orientation="left">Misc</Divider>

        <div className={styles.container}>
          <Form.Item className={styles.container}>
            <Form.Item label="End of Day" style={{ display: "inline-block" }}>
              <Input
                value={shiftRules?.endOfDay}
                style={{ width: "5rem", marginRight: "1rem" }}
                onChange={(e) => handleChange(e.target.value, "endOfDay")}
                placeholder="Time"
              />
            </Form.Item>
            <Form.Item label="Handling" style={{ display: "inline-block" }}>
              <Radio.Group
                options={endOfDayOptions}
                onChange={(e) =>
                  handleChange(e.target.value, "endOfDayHandling")
                }
                value={shiftRules?.endOfDayHandling}
                optionType="button"
              />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="Duplicate Punch Handling (Minutes)"
            className={styles.container}
          >
            <Input
              value={shiftRules.duplicatePunchHandling}
              onChange={(e) =>
                handleChange(e.target.value, "duplicatePunchHandling")
              }
              style={{ width: "5rem" }}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ShiftRules;
