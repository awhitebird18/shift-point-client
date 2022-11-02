import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../state";
import { useState } from "react";
import { Form, Input, Select } from "antd";
const { Option, OptGroup } = Select;
import { Button } from "../../../../components";
import styles from "./AddShift.module.css";
import convertShiftTimesToDate from "../../functions/convertShiftTimesToDate";

import dayjs from "dayjs";

const AddShift = ({ shift, positionList, employee }) => {
  const [currentShift, setCurrentShift] = useState({ ...shift });
  const dispatch = useDispatch();

  const { addNewShift, editShift, showModal } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const handleOk = () => {
    if (currentShift._id) {
      editShift(convertShiftTimesToDate(currentShift));
    } else {
      addNewShift(convertShiftTimesToDate(currentShift));
    }

    showModal(null);
  };

  const handleClose = () => {
    showModal(null);
  };

  const colors = [
    "Red",
    "Volcano",
    "Orange",
    "Yellow",
    "lime",
    "Green",
    "Teal",
    "Blue",
    "Purple",
    "Magenta",
  ];

  const colorOptions = colors.map((color, index) => {
    return (
      <Option key={index} value={color.toLowerCase()}>
        <div className={styles.option}>
          <div
            className={`shift published ${color.toLowerCase()} ${
              styles.colorDisplay
            }`}
          ></div>
          {color}
        </div>
      </Option>
    );
  });

  const assignedPositions = [];
  const unassignedPositions = [];

  positionList.forEach((position) => {
    const positionAssigned = employee.positions.findIndex((el) => {
      return el.positionId === position._id;
    });

    if (positionAssigned !== -1) {
      assignedPositions.push(position);
    } else {
      unassignedPositions.push(position);
    }
  });

  const assignedPositionOptions = assignedPositions.map((position) => {
    return (
      <Option key={position._id} value={position._id}>
        {position.name}
      </Option>
    );
  });

  const unassignedPositionOptions = unassignedPositions.map((position) => {
    return (
      <Option key={position._id} value={position._id}>
        {position.name}
      </Option>
    );
  });

  const handleChange = (value, field) => {
    setCurrentShift((prev) => {
      return { ...prev, [field]: value };
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Date">{currentShift?.date.format("MMMM DD")}</Form.Item>
      <Form.Item label="Employee">{`${employee.firstName} ${employee.lastName}`}</Form.Item>
      <Form.Item label="Position">
        <Select
          value={currentShift.positionId}
          onChange={(e) => handleChange(e, "positionId")}
        >
          <OptGroup label="Employee Positions">
            {assignedPositionOptions}
          </OptGroup>
          <OptGroup label="Company Positions">
            {unassignedPositionOptions}
          </OptGroup>
        </Select>
      </Form.Item>
      <Form.Item
        label="Start"
        style={{
          width: "calc(50% - 1rem)",
          marginRight: "1rem",
          display: "inline-block",
        }}
      >
        <Input
          value={
            dayjs.isDayjs(currentShift.start)
              ? currentShift.start.format("h:mm a")
              : currentShift.start
          }
          onChange={(e) => handleChange(e.target.value, "start")}
        />
      </Form.Item>
      <Form.Item label="End" style={{ width: "50%", display: "inline-block" }}>
        <Input
          value={
            dayjs.isDayjs(currentShift.end)
              ? currentShift.end.format("h:mm a")
              : currentShift.end
          }
          onChange={(e) => handleChange(e.target.value, "end")}
        />
      </Form.Item>
      <Form.Item label="Color" style={{ width: "100%" }}>
        <Select
          value={currentShift.colorCode.toLowerCase()}
          onChange={(e) => handleChange(e, "colorCode")}
        >
          {colorOptions}
        </Select>
      </Form.Item>

      <div className={styles.formActions}>
        <Button
          type="secondary"
          onClick={handleClose}
          style={{ marginLeft: "auto" }}
        >
          Cancel
        </Button>
        <Button onClick={handleOk}>Save</Button>
      </div>
    </Form>
  );
};

export default AddShift;
