import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../../../State";

// Components
import { Button } from "../../../../Components";
import { Checkbox } from "antd";
import { ProfilePicture } from "../../../../Components";

// Styles
import styles from "./ScheduleDetailed.module.css";

const ScheduleDetailed = ({ current, setCurrent }) => {
  const [updatedList, setUpdatedList] = useState([...current.employeeList]);
  const employees = useSelector((state) => {
    return state.employee;
  });

  const { department, costcentre } = useSelector((state) => {
    return state.payroll;
  });

  const dispatch = useDispatch();

  const { updateSchedule } = bindActionCreators(actionCreators, dispatch);

  const handleEmployeeChange = (id, e) => {
    setUpdatedList((state) => {
      const stateCopy = [...state];
      const eeIndex = state.findIndex((el) => {
        return el === id;
      });

      if (!e.target.checked && eeIndex !== -1) {
        stateCopy.splice(eeIndex, 1);
      }

      if (e.target.checked && eeIndex === -1) {
        stateCopy.push(id);
      }

      return stateCopy;
    });
  };

  const handleSave = () => {
    updateSchedule({ ...current, employeeList: [...updatedList] });

    setCurrent(null);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={`list-header--sm ${styles.columns}`}>
          <div style={{ textAlign: "center" }}>Added</div>
          <div>Name</div>
          <div className="hide--tablet">Department</div>
          <div className="hide--medium">Cost Centre</div>
        </div>

        <div className={styles.employeeList}>
          {employees.map((employee, index) => {
            const employeeAdded = updatedList.findIndex((el) => {
              return el === employee._id;
            });

            const eeDepartment = department.find((department) => {
              return department._id === employee.homeDepartment;
            });

            const eeCostCentre = costcentre.find((costcentre) => {
              return costcentre._id === eeDepartment.costCentreId;
            });

            return (
              <div key={index} className={`list-item--sm ${styles.columns}`}>
                <div className={styles.checkbox}>
                  <Checkbox
                    checked={employeeAdded !== -1 ? true : false}
                    onChange={(e) => {
                      handleEmployeeChange(employee._id, e);
                    }}
                  />
                </div>
                <div className={styles.employee}>
                  <ProfilePicture
                    user={employee}
                    className={styles.employeeProfileImage}
                  />
                  <p>{`${employee.firstName} ${employee.lastName}`}</p>
                </div>

                <div className="hide--tablet">{eeDepartment?.name}</div>
                <div className="hide--medium">{eeCostCentre?.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.formActions}>
        <Button
          type="secondary"
          style={{
            width: "7rem",
            height: "2.5rem",
          }}
          onClick={() => setCurrent(null)}
        >
          Back
        </Button>
        <Button
          style={{
            width: "7rem",
            height: "2.5rem",
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ScheduleDetailed;
