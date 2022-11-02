import { Input, Select } from "antd";
const { Option } = Select;
import styles from "./ScheduledRoundingSegment.module.css";

const ScheduledRoundingSegment = ({ timesheetRules, setTimesheetRules, punchTransaction, section }) => {
  const handleScheduledChange = (e, type) => {
    setTimesheetRules((prev) => {
      return {
        ...prev,
        scheduledRounding: {
          ...prev.scheduledRounding,
          [section]: { ...prev.scheduledRounding[section], [type]: e },
        },
      };
    });
  };

  return (
    <div className={styles.punchTransaction}>
      <div className={styles.scheduledPunchLabel}>
        <h3>Punch Transaction:</h3>
        <div>{punchTransaction}</div>
        <div className={styles.emptyTile}></div>

        <div>Transaction Window:</div>
        <Input
          value={timesheetRules.scheduledRounding?.[section]?.window}
          onChange={(e) => handleScheduledChange(e.target.value, "window")}
        />
        <div className={styles.emptyTile}></div>
      </div>
      <div className={styles.roundingGrid}>
        {/* First Row */}
        <div></div>
        <div>Rounding Type</div>
        <div>Rounding Unit</div>

        {/* Second Row */}
        <div>Before Window:</div>

        <Select
          name="startType"
          value={timesheetRules.scheduledRounding?.[section]?.beforeWindowType}
          onChange={(e) => handleScheduledChange(e, "beforeWindowType")}
          style={{ width: "100%" }}
        >
          <Option key="norounding" value="norounding">
            No Rounding
          </Option>
          <Option key="next" value="next">
            Next
          </Option>
          <Option key="previous" value="previous">
            Previous
          </Option>
          <Option key="nearest" value="nearest">
            Nearest
          </Option>
        </Select>
        <Select
          name="startUnit"
          value={timesheetRules.scheduledRounding?.[section]?.beforeWindowUnit}
          onChange={(e) => handleScheduledChange(e, "beforeWindowUnit")}
          style={{ width: "100%" }}
        >
          <Option key="1" value="1">
            1 Minute
          </Option>
          <Option key="6" value="6">
            6 Minutes
          </Option>
          <Option key="10" value="10">
            10 Minutes
          </Option>
          <Option key="15" value="15">
            15 Minutes
          </Option>
          <Option key="30" value="30">
            30 Minutes
          </Option>
          <Option key="60" value="60">
            60 Minutes
          </Option>
        </Select>

        {/* Third Row */}
        <div>After Window:</div>

        <Select
          value={timesheetRules.scheduledRounding?.[section]?.afterWindowType}
          onChange={(e) => handleScheduledChange(e, "afterWindowType")}
          style={{ width: "100%" }}
        >
          <Option key="norounding" value="norounding">
            No Rounding
          </Option>
          <Option key="next" value="next">
            Next
          </Option>
          <Option key="previous" value="previous">
            Previous
          </Option>
          <Option key="nearest" value="nearest">
            Nearest
          </Option>
        </Select>
        <Select
          value={timesheetRules.scheduledRounding?.[section]?.afterWindowUnit}
          onChange={(e) => handleScheduledChange(e, "afterWindowUnit")}
          style={{ width: "100%" }}
        >
          <Option key="1" value="1">
            1 Minute
          </Option>
          <Option key="6" value="6">
            6 Minutes
          </Option>
          <Option key="10" value="10">
            10 Minutes
          </Option>
          <Option key="15" value="15">
            15 Minutes
          </Option>
          <Option key="30" value="30">
            30 Minutes
          </Option>
          <Option key="60" value="60">
            60 Minutes
          </Option>
        </Select>
      </div>
    </div>
  );
};

export default ScheduledRoundingSegment;
