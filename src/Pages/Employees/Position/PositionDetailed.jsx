import { useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../State";

// Components
import { Input, Form, Checkbox, Select } from "antd";
const { Option } = Select;
import { Button } from "../../../Components";

import { convertToOptionsArr } from "../../Timesheet/Functions/convertToOptions";

// Styles
import styles from "./PositionDetailed.module.css";

const PositionDetailed = ({
  position,
  positionList,
  departmentList,
  earningList,
  currentEmployee,
  setCurrentEmployee,
}) => {
  const [currentPosition, setCurrentPosition] = useState(position);
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const departmentOptions = convertToOptionsArr(
    departmentList,
    "Select a position"
  );

  const earningOptions = convertToOptionsArr(earningList, "Select an earning");

  const positionOptions = positionList?.map((position, index) => {
    const positionAssigned = currentEmployee.positions.findIndex(
      (assignedPosition) => {
        return assignedPosition.positionId === position._id;
      }
    );

    if (positionAssigned !== -1) {
      return;
    }

    return (
      <Option key={index} value={position._id}>
        {position.name}
      </Option>
    );
  });
  positionOptions?.unshift(<Option key="undefined" value=""></Option>);

  // Handle Save
  const handleSave = () => {
    let url = `${process.env.REACT_APP_BASE_URL}/employee/position`;
    let method = currentPosition._id ? "PATCH" : "POST";

    if (method === "PATCH") {
      url = url.concat(`/${currentPosition._id}`);
    }

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: method,
      cors: "no-cors",

      body: JSON.stringify({
        position: currentPosition,
        employeeId: currentEmployee._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentEmployee((prev) => {
          if (method === "PATCH") {
            const index = prev.positions.findIndex((el) => {
              return el._id === currentPosition._id;
            });
            prev.positions.splice(index, 1, data.position);

            return { ...prev, positions: [...prev.positions] };
          } else {
            prev.positions.push(data.position);

            return { ...prev, positions: [...prev.positions] };
          }
        });

        showModal(null);
      });
  };

  // Cancel form
  const handleCancel = () => {
    showModal(null);
  };

  // Handle Change
  const handleChange = (e, fieldName) => {
    if (fieldName === "position") {
      const position = positionList.find((el) => {
        return el._id === e;
      });

      const positionCopy = { ...position, positionId: position._id };

      delete positionCopy._id;

      setCurrentPosition(positionCopy);
      return;
    }

    let key = fieldName ? fieldName : e.target.name;
    let value = fieldName
      ? e
      : e.target.value
      ? e.target.value
      : e.target.checked;

    setCurrentPosition((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleEarningChange = (e) => {
    const earningFound = earningList.find((el) => {
      return el._id === e;
    });

    setCurrentPosition((prev) => {
      return {
        ...prev,
        rate: prev.rate
          ? prev.rate
          : earningFound.rate >= 0
          ? earningFound.rate
          : "",
        earningId: e,
      };
    });
  };

  const defaultPosition = positionList.find((el) => {
    return el._id === currentPosition?.positionId;
  });

  return (
    <Form layout="vertical">
      <div className={`${styles.grid} ${styles.cols_2}`}>
        <Form.Item
          label="Position Name"
          style={{ flexGrow: "1", width: "100%" }}
        >
          {currentPosition._id ? (
            `${defaultPosition?.name}`
          ) : (
            <Select
              onChange={(e) => handleChange(e, "position")}
              value={currentPosition.positionId}
            >
              {positionOptions.length > 0 ? positionOptions : ""}
            </Select>
          )}
        </Form.Item>

        {/* Primary */}
        <Form.Item label="Set as Primary">
          <Checkbox
            name="primary"
            checked={currentPosition.primary}
            onChange={handleChange}
          ></Checkbox>
        </Form.Item>
      </div>
      <div className={`${styles.grid} ${styles.cols_2}`}>
        <Form.Item label="Earning Type">
          <Select
            defaultValue=""
            onChange={handleEarningChange}
            value={currentPosition.earningId}
          >
            {earningOptions && earningOptions.length > 0 ? earningOptions : ""}
          </Select>
        </Form.Item>

        <Form.Item label="Department">
          <Select
            onChange={(e) => handleChange(e, "departmentId")}
            value={currentPosition.departmentId}
          >
            {departmentOptions.length > 0 ? departmentOptions : ""}
          </Select>
        </Form.Item>
      </div>

      <div className={`${styles.grid} ${styles.cols_3}`}>
        <Form.Item label="Start Time">
          <Input
            defaultValue=""
            onChange={(e) => handleChange(e.target.value, "start")}
            value={currentPosition.start}
          />
        </Form.Item>
        <Form.Item label="End Time">
          <Input
            defaultValue=""
            onChange={(e) => handleChange(e.target.value, "end")}
            value={currentPosition.end}
          />
        </Form.Item>

        <Form.Item label="Earning Rate">
          <Input
            defaultValue=""
            onChange={(e) => handleChange(e.target.value, "earningRate")}
            value={currentPosition.rate}
          />
        </Form.Item>
      </div>

      <div className={styles.formActions}>
        <Button type="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </Form>
  );
};

export default PositionDetailed;
