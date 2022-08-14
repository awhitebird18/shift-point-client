import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

// Styles
import styles from "./PositionRow.module.css";

// Components
import { Button } from "../../../Components";
import { DeleteOutlined } from "@ant-design/icons";

const PositionRow = ({
  position,
  positionList,
  earningList,
  departmentList,
  currentEmployee,
  setCurrentEmployee,
}) => {
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);
  //Earning
  const earning = earningList.find((el) => {
    return el._id === position.earningId;
  });

  // Department
  const department = departmentList.find((el) => {
    return el._id === position.departmentId;
  });

  // Handle Delete Position
  const handleDelete = (e) => {
    e.stopPropagation();
    const url = `${process.env.REACT_APP_BASE_URL}/employee/position/${position._id}`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      cors: "no-cors",
      body: JSON.stringify({
        employeeId: currentEmployee._id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCurrentEmployee((prev) => {
          const positionList = prev.positions.filter((el) => {
            return el._id !== data._id;
          });
          return { ...prev, positions: [...positionList] };
        });
      });
  };

  // Handle Edit Position
  const handleEdit = () => {
    showModal({
      name: "EMPLOYEE_POSITION_DETAILED",
      title: "Edit Position",
      position,
      positionList,
      earningList,
      departmentList,
      currentEmployee,
      setCurrentEmployee,
    });
  };

  // Set Premium
  let premium =
    position.premium && position.premium.length > 0
      ? position.premium[0]
      : "None";

  if (position.premium && position.premium.length > 1) {
    premium = "Multiple";
  }

  return (
    <div className={`list-item--md ${styles.columns}`} onClick={handleEdit}>
      <div>{position.name}</div>
      <div className="hide--tablet">{department && department.name}</div>
      <div className="hide--tablet">{earning && earning.name}</div>
      <div className="hide--tablet">{premium}</div>
      <div className="hide--tablet">{position.primary ? "True" : "False"}</div>

      <Button
        onClick={handleDelete}
        type="secondary"
        style={{
          width: "100%",
          height: "2rem",
          fontSize: "0.8rem",
        }}
      >
        Unassign
        {/* <DeleteOutlined className={styles.delete} /> */}
      </Button>
    </div>
  );
};

export default PositionRow;
