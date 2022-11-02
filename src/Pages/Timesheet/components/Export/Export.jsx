import { useState, useRef } from "react";
import styles from "./Export.module.css";
import { Form, Radio, Select, DatePicker } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;
import { CSVLink } from "react-csv";
import Button from "../../../../components/Button/Button";
import { fetchTimesheetReport } from "../../functions/fetchTimesheetReport.js";

const Export = ({ cancelText, okText, showModal }) => {
  const csvDownloadRef = useRef();
  const [parameters, setParameters] = useState();
  const [csvData, setCsvData] = useState("");

  const handleChange = (value, type) => {
    setParameters((state) => {
      return { ...state, [type]: value };
    });
  };

  let reportOptions = [];

  if (parameters?.reportType === "timesheet") {
    const reports = [
      { name: "Detailed", value: "detailed" },
      { name: "Summary", value: "summary" },
      { name: "Exceptions", value: "exceptions" },
    ];

    reportOptions = reports.map((report) => {
      return (
        <Option key={report.value} value={report.value}>
          {report.name}
        </Option>
      );
    });
  } else {
    const reports = [{ name: "Payroll Export", value: "payrollExport" }];

    reportOptions = reports.map((report) => {
      return (
        <Option key={report.value} value={report.value}>
          {report.name}
        </Option>
      );
    });
  }

  function handleClose() {
    showModal(null);
  }

  async function handleOk(parameters) {
    const parametersFormatted = {
      ...parameters,
      dateFrom: parameters.dateRange[0].format("MM/DD/YYYY"),
      dateTo: parameters.dateRange[1].format("MM/DD/YYYY"),
    };

    const data = await fetchTimesheetReport(parametersFormatted);

    setCsvData(data);

    csvDownloadRef.current.link.click();

    showModal(null);
  }

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Form layout="vertical">
          <Form.Item label="Report Type">
            <Radio.Group
              onChange={(e) => handleChange(e.target.value, "reportType")}
              value={parameters?.reportType}
            >
              <Radio.Button value="payroll">Payroll</Radio.Button>
              <Radio.Button value="timesheet">Timesheet</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Select Report">
            <Select
              value={parameters?.report}
              onChange={(e) => handleChange(e, "report")}
            >
              {reportOptions}
            </Select>
          </Form.Item>
          {parameters?.reportType === "timesheet" && (
            <>
              <Form.Item
                label="Date Range"
                className={styles.formParallelLeft}
                // style={{
                //   width: "calc(50% - 1rem)",
                //   marginRight: "1rem",
                //   display: "inline-block",
                // }}
              >
                <RangePicker
                  onChange={(e) => {
                    handleChange(e, "dateRange");
                  }}
                />
              </Form.Item>
              <Form.Item
                className={styles.formParallelRight}
                label="Status"
                // style={{
                //   width: "calc(50%)",
                //   display: "inline-block",
                // }}
              >
                <Select
                  value={parameters?.status}
                  onChange={(e) => handleChange(e, "status")}
                >
                  <Option value="">All</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
        <CSVLink
          data={csvData}
          filename="timesheet_export.csv"
          target="_blank"
          ref={csvDownloadRef}
        />
      </div>

      <div className={styles.footer}>
        <Button type="secondary" onClick={() => handleClose()}>
          {cancelText ? cancelText : "Cancel"}
        </Button>

        <Button onClick={() => handleOk(parameters)}>
          {okText ? okText : "Get Data"}
        </Button>
      </div>
    </div>
  );
};

export default Export;
