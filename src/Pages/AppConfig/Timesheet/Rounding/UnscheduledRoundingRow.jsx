// Components
import { Select } from "antd";
const { Option } = Select;

const UnscheduledRoundingRow = ({
  timesheetRules,
  setTimesheetRules,
  type,
}) => {
  const handleUnscheduledChange = (e, type) => {
    setTimesheetRules((prev) => {
      return {
        ...prev,
        unscheduledRounding: { ...prev.unscheduledRounding, [type]: e },
      };
    });
  };

  return (
    <>
      <div>{`${type.substring(0, 1).toUpperCase()}${type.substring(1)}`}</div>

      <Select
        value={timesheetRules.unscheduledRounding?.[`${type}Type`]}
        onChange={(e) => handleUnscheduledChange(e, `${type}Type`)}
        style={{ width: "100%" }}
      >
        <Option value="norounding">No Rounding</Option>
        <Option value="next">Next</Option>
        <Option value="previous">Previous</Option>
        <Option value="nearest">Nearest</Option>
      </Select>
      <Select
        value={timesheetRules.unscheduledRounding?.[`${type}Unit`]}
        onChange={(e) => handleUnscheduledChange(e, `${type}Unit`)}
        style={{ width: "100%" }}
      >
        <Option value="1">1 Minute</Option>
        <Option value="6">6 Minutes</Option>
        <Option value="10">10 Minutes</Option>
        <Option value="15">15 Minutes</Option>
        <Option value="30">30 Minutes</Option>
        <Option value="60">60 Minutes</Option>
      </Select>
    </>
  );
};

export default UnscheduledRoundingRow;
