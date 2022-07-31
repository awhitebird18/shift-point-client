// Components
import { DatePicker as DatePickerANT } from "antd";
const { RangePicker } = DatePickerANT;

import moment from "moment";

const DatePicker = ({ dateRange, setDateRange }) => {
  // Date Range on Change
  function onChange(dates, dateStrings) {
    setDateRange({
      start: new Date(`${dateStrings[0]} 12:00 am`),
      end: new Date(`${dateStrings[1]} 12:00 am`),
    });
  }

  return (
    <RangePicker
      ranges={{
        Today: [moment(), moment()],
        "This Month": [moment().startOf("month"), moment().endOf("month")],
      }}
      onChange={onChange}
      value={[moment(dateRange.start), moment(dateRange.end)]}
      defaultValue={(moment(), moment())}
      format="MMM D, YYYY"
      style={{ minWidth: "10rem" }}
    />
  );
};

export default DatePicker;
