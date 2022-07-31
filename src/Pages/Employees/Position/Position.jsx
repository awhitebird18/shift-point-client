import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

// Styles
import styles from "./Position.module.css";

// Components
import PositionRow from "./PositionRow.jsx";
import { Button } from "../../../Components";

// Functions
import { useFetch } from "../../../Hooks";

const Position = ({
  currentEmployee,
  setCurrentEmployee,
  departmentList,
  earningList,
}) => {
  const [positionList] = useFetch("position");
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAssignPosition = () => {
    showModal({
      name: "EMPLOYEE_POSITION_DETAILED",
      position: {},
      departmentList,
      earningList,
      positionList,
      currentEmployee,
      setCurrentEmployee,
    });
  };

  return (
    <div>
      <div className={`list-header--md ${styles.columns}`}>
        <div>Position Name</div>
        <div className="hide--tablet">Department</div>
        <div className="hide--tablet">Earning</div>
        <div className="hide--tablet">Premium</div>
        <div className="hide--tablet">Primary</div>
        <div>Unassign</div>
      </div>
      <div className={styles.list}>
        {earningList && departmentList && currentEmployee
          ? currentEmployee.positions.map((el, index) => {
              return (
                <PositionRow
                  key={index}
                  position={el}
                  positionList={positionList}
                  earningList={earningList}
                  departmentList={departmentList}
                  currentEmployee={currentEmployee}
                  setCurrentEmployee={setCurrentEmployee}
                />
              );
            })
          : "No Positions to show"}
      </div>

      <Button onClick={handleAssignPosition} className={styles.addButton}>
        Add Position
      </Button>
    </div>
  );
};

export default Position;
