import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../State";

// Styles
import styles from "./Extended.module.css";

// Components
import { Select, Input } from "antd";
const { Option } = Select;
import { BsFillPlusCircleFill, BsXLg } from "react-icons/bs";

import {
  addTimesheetFilter,
  removeTimesheetFilter,
  changeTimesheetFilter,
} from "../../../../State/actionCreators";

import { useFetch } from "../../../../Hooks";

const ExtendedFilterBar = ({
  componentTopPage,
  setTimesheetFilters,
  setShowExtendedFilters,
  departments,
  timesheetFilter,
}) => {
  const [positions] = useFetch("/position");

  useEffect(() => {
    if (timesheetFilter.length === 0) {
      addTimesheetFilter(0);
    }
  }, []);

  const dispatch = useDispatch();

  const { addTimesheetFilter, removeTimesheetFilter, changeTimesheetFilter } =
    bindActionCreators(actionCreators, dispatch);

  const removeFilter = (index) => {
    removeTimesheetFilter(index);

    if (timesheetFilter.length === 1) {
      setShowExtendedFilters(false);
    }
  };

  const containsOptions = () => {
    return (
      <>
        <Option value="contains">Contains</Option>
        <Option value="notcontains">Doesn't Contain</Option>
        <Option value="is">Is</Option>
        <Option value="isNot">Is Not</Option>
        <Option value="startsWith">Starts With</Option>
      </>
    );
  };

  const multiSelectSubtype = () => {
    return (
      <>
        <Option value="isAnyOf">Is any of</Option>
        <Option value="isNotAnyOf">Is Not any of</Option>
      </>
    );
  };

  const shiftSelectSubType = () => {
    return (
      <>
        <Option value="is">is</Option>
        <Option value="isNot">is not</Option>
      </>
    );
  };

  const departmentOptions = departments?.map((department, index) => {
    return (
      <Option key={index} value={department._id}>
        {department.name}
      </Option>
    );
  });

  const positionOptions = positions?.map((position, index) => {
    return (
      <Option key={index} value={position._id}>
        {position.name}
      </Option>
    );
  });

  const shiftOptions = [
    { value: "pending", name: "Pending" },
    { value: "approved", name: "Approved" },
    { value: "empty", name: "Empty" },
  ].map((el, index) => {
    return (
      <Option key={index} value={el.value}>
        {el.name}
      </Option>
    );
  });

  return (
    <div className={styles.container}>
      {timesheetFilter?.map((filter, index) => {
        return (
          <div key={index}>
            {index > 0 && (
              <div style={{ color: "var(--color-primary)", padding: "0.5rem" }}>
                <Select
                  value={filter.combinator}
                  style={{ width: "5rem" }}
                  bordered={false}
                  defaultValue="or"
                  onChange={(e) => {
                    changeTimesheetFilter(e, "combinator", index);
                  }}
                >
                  {filter.combinator === "and" ? (
                    <Option value="or">Or</Option>
                  ) : (
                    <Option value="and">And</Option>
                  )}
                </Select>
              </div>
            )}

            {/* Filter Row */}
            <div className={styles.filterRow}>
              {/* Type */}
              <Select
                value={filter.type}
                bordered={false}
                style={{
                  borderBottom: "1px solid lightgray",
                  minWidth: "8rem",
                }}
                onChange={(e) => {
                  changeTimesheetFilter(e, "type", index);
                }}
                placeholder="Select..."
              >
                <Option value="firstName">First Name</Option>
                <Option value="lastName">Last Name</Option>
                <Option value="homeDepartment">Department</Option>
                <Option value="positionId">Position</Option>
                <Option value="eeNum">Employee Number</Option>
                <Option value="status">Status</Option>
              </Select>

              {/* Sub Type */}
              <Select
                value={filter.subtype}
                bordered={false}
                style={{
                  borderBottom: "1px solid lightgray",
                  minWidth: "8rem",
                }}
                placeholder="Select..."
                onChange={(e) => {
                  changeTimesheetFilter(e, "subtype", index);
                }}
              >
                {(filter.type === "homeDepartment" ||
                  filter.type === "positionId") &&
                  multiSelectSubtype()}

                {(filter.type === "firstName" || filter.type === "lastName") &&
                  containsOptions()}

                {filter.type === "status" && shiftSelectSubType()}
              </Select>
              <div>
                {/* Value */}
                {(filter.type === "firstName" ||
                  filter.type === "lastName" ||
                  filter.type === "eeNum") && (
                  <Input
                    value={filter.value}
                    bordered={false}
                    style={{
                      borderBottom: "1px solid lightgray",
                      minWidth: "8rem",
                    }}
                    placeholder="Type Here"
                    onChange={(e) => {
                      changeTimesheetFilter(e.target.value, "value", index);
                    }}
                  />
                )}

                {filter.type === "homeDepartment" && (
                  <Select
                    mode="multiple"
                    value={filter.value}
                    bordered={false}
                    style={{
                      borderBottom: "1px solid lightgray",
                      minWidth: "15rem",
                    }}
                    onChange={(e) => {
                      changeTimesheetFilter(e, "value", index);
                    }}
                    maxTagCount="responsive"
                  >
                    {departmentOptions}
                  </Select>
                )}

                {filter.type === "positionId" && (
                  <Select
                    mode="multiple"
                    value={filter.value}
                    bordered={false}
                    style={{
                      borderBottom: "1px solid lightgray",
                      minWidth: "15rem",
                    }}
                    onChange={(e) => {
                      changeTimesheetFilter(e, "value", index);
                    }}
                    maxTagCount="responsive"
                  >
                    {positionOptions}
                  </Select>
                )}

                {filter.type === "status" && (
                  <Select
                    value={filter.value}
                    bordered={false}
                    style={{
                      borderBottom: "1px solid lightgray",
                      minWidth: "15rem",
                    }}
                    onChange={(e) => {
                      changeTimesheetFilter(e, "value", index);
                    }}
                    maxTagCount="responsive"
                  >
                    {shiftOptions}
                  </Select>
                )}
              </div>

              <div className={styles.filterActions}>
                <BsFillPlusCircleFill
                  className={styles.addIcon}
                  onClick={() => addTimesheetFilter(index)}
                />
                <BsXLg
                  className={styles.removeIcon}
                  onClick={() => removeFilter(index)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExtendedFilterBar;
