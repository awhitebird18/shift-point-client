import React, { useState } from "react";
import styles from "./generateSchedule.module.css";
import { DatePicker, Form, Select } from "antd";
import { Button } from "../../../../components";

const GenerateSchedule = () => {
  const [startDate, setStartDate] = useState();
  const [payDate, setPayDate] = useState();
  const [payPeriod, setPayPeriod] = useState();

  const handleCreateSchedule = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/payschedule`;

    console.log({
      startDate,
      payDate,
      payPeriod,
    });

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      // cors: "cors",
      mode: "cors",
      body: JSON.stringify({
        // Convert object to JSON string
        startDate: startDate.format("YYYY-MM-DD"), // Corrected the date format
        payDate: payDate.format("YYYY-MM-DD"), // Corrected the date format
        payPeriod: payPeriod,
      }),
    }).then(() => {
      console.log("success");
    });
  };

  const handleDeletePaySchedule = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/payschedule`;
    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      // cors: "cors",
      mode: "cors",
    }).then(() => {
      console.log("Deleted");
    });
  };

  return (
    <div className={styles.container}>
      <Form>
        <Form.Item label="Start Date">
          <DatePicker onChange={(val) => setStartDate(val)} />
        </Form.Item>

        <Form.Item label="Pay Date">
          <DatePicker onChange={(val) => setPayDate(val)} />
        </Form.Item>

        <Form.Item>
          <Select
            defaultValue="weekly"
            style={{ width: 120 }}
            onChange={(val) => setPayPeriod(val)}
            options={[
              { value: "weekly", label: "Weekly" },
              { value: "biweekly", label: "BiWeekly" },
            ]}
          />
        </Form.Item>
      </Form>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button onClick={handleCreateSchedule}>Create Schedule</Button>
        <Button type="secondary" onClick={handleDeletePaySchedule}>
          Delete Schedule
        </Button>
      </div>
    </div>
  );
};

export default GenerateSchedule;
