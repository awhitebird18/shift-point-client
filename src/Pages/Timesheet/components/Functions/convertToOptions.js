import { Select } from "antd";
const { Option } = Select;
import { getCurrentDate } from "./getCurrentDate";

export const convertToEmployeeOptions = (arr) => {
  const options = arr.map((el, index) => {
    return (
      <Option
        key={index}
        value={el._id}
      >{`${el.firstName} ${el.lastName}`}</Option>
    );
  });

  options.unshift(
    <Option key="undefined" value="undefined">
      All Employees
    </Option>
  );

  return options;
};

export const convertToPayPeriodOptions = (arr) => {
  const currentTime = getCurrentDate();

  const options = arr.map((el, index) => {
    let active;

    if (
      currentTime.getTime() > el.start.getTime() &&
      currentTime.getTime() < el.start.getTime() + 604800000
    ) {
      active = { backgroundColor: "#efdbff" };
    }

    return (
      <Option
        style={{ backgroundColor: active ? "#efdbff" : "" }}
        key={index}
        value={el._id}
      >
        {`${el.name} ${active ? "(Current)" : ""}`}
      </Option>
    );
  });

  return options;
};
