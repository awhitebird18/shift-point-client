import { Select } from "antd";
const { Option } = Select;
import styles from "./TimesheetRules.module.css";
import { useFetch } from "../../../../hooks";

const TimesheetRules = ({ employeeTimesheetRules, setCurrentEmployee }) => {
  const [timesheetRules] = useFetch("timesheetrules");

  const overtimeOptions = timesheetRules?.overtime.map((el) => {
    return (
      <Option key={el._id} value={el._id}>
        {el.name}
      </Option>
    );
  });

  const breakOptions = timesheetRules?.breakTemplates.map((el) => {
    return (
      <Option key={el.templateId} value={el.templateId}>
        {el.templateName}
      </Option>
    );
  });

  const handleChange = (value, field) => {
    setCurrentEmployee((prev) => {
      return {
        ...prev,
        timesheetrules: { ...prev.timesheetrules, [field]: value },
        save: true,
      };
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h3 className={styles.title}>Overtime Rules</h3>
        <Select
          value={employeeTimesheetRules?.overtimeTemplateId}
          onChange={(e) => handleChange(e, "overtimeTemplateId")}
          style={{ flexGrow: "1" }}
        >
          {overtimeOptions}
        </Select>
      </div>

      <div className={styles.section}>
        <h3 className={styles.title}>Break Rules</h3>
        <Select
          value={employeeTimesheetRules?.breakTemplateId}
          onChange={(e) => handleChange(e, "breakTemplateId")}
          style={{ flexGrow: "1" }}
        >
          {breakOptions}
        </Select>
      </div>
    </div>
  );
};

export default TimesheetRules;
