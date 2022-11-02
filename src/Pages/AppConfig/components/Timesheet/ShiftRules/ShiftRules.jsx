import { useState } from "react";
import styles from "./ShiftRules.module.css";
import { Form, Input, Radio } from "antd";
import useDebounce from "../../../../../hooks/useDebounce";

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
    <div className={styles.container}>
      <Form layout="vertical" style={{ width: "max-content" }}>
        <h2 className={styles.sectionLabel}>Shift Limits</h2>
        <div>
          <Form.Item>
            <Form.Item label="Min Hours" style={{ display: "inline-block" }}>
              <Input
                name="minShiftLength"
                value={shiftRules?.minShiftLength}
                style={{ width: "6rem", marginRight: "1rem" }}
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

          <Form.Item>
            <Form.Item label="Max Hours" style={{ display: "inline-block" }}>
              <Input
                value={shiftRules?.maxShiftLength}
                style={{ width: "6rem", marginRight: "1rem" }}
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
        <h2 className={styles.sectionLabel}>Miscellaneous</h2>

        <div>
          <Form.Item>
            <Form.Item label="End of Day" style={{ display: "inline-block" }}>
              <Input
                value={shiftRules?.endOfDay}
                style={{ width: "6rem", marginRight: "1rem" }}
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

          <Form.Item label="Duplicate Punch Handling (Minutes)">
            <Input
              value={shiftRules.duplicatePunchHandling}
              onChange={(e) =>
                handleChange(e.target.value, "duplicatePunchHandling")
              }
              style={{ width: "6rem" }}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ShiftRules;
