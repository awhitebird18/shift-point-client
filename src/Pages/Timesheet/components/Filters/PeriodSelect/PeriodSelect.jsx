import { Select } from "antd";
const { Option, OptGroup } = Select;
import { convertToPayPeriodOptions } from "../../Functions/convertToOptions";
import useFetch from "../../../../../hooks/useFetch";

const PayPeriodSelect = ({ setDateRange, style, dateRange }) => {
  const currentTime = new Date(Date.now());
  const [payPeriods] = useFetch("/payschedule", null, null, "convertDates");

  // Pay Period Select Options
  const payPeriodOptions = convertToPayPeriodOptions(payPeriods);

  const quickOptions = [];

  const currentPay = payPeriods.find((el) => {
    return currentTime.getTime() > el.start.getTime() && currentTime.getTime() < el.start.getTime() + 604800000;
  });

  quickOptions.unshift(
    <Option key="currentPay" value={currentPay && currentPay._id}>
      Current Pay Period
    </Option>
  );

  // Pay Period on Change
  const payPeriodOnChange = (e) => {
    const currentPay = payPeriods.find((el) => {
      return el._id === e;
    });

    setDateRange({
      start: currentPay.start,
      end: currentPay.end,
      id: currentPay._id,
    });
  };

  const customStyles = {
    width: "100%",
    textAlign: "left",
    ...style,
  };

  return (
    <Select onChange={payPeriodOnChange} style={customStyles} value={dateRange?.id} placeholder="Pay Period Select" bordered={false}>
      <OptGroup label="Quick Actions">{quickOptions}</OptGroup>
      <OptGroup label="All Pay Periods">{payPeriodOptions}</OptGroup>
    </Select>
  );
};

export default PayPeriodSelect;
