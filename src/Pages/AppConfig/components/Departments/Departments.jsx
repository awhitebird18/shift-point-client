import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../state";
import { bindActionCreators } from "redux";
import styles from "./Departments.module.css";
import DepartmentRow from "./Row";
import { Button } from "../../../../components";
import { useFetch } from "../../../../hooks";

const Departments = () => {
  const [departmentList, setDepartmentList] = useFetch("/department");
  const [costCentreList] = useFetch("/costcentre");

  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddDepartment = () => {
    showModal({
      name: "DEPARTMENT_CONFIG",
      title: "Create Department",
      costCentreList,
      setDepartmentList,
      department: {},
    });
  };

  return (
    <>
      <div>
        <div className={`list-header--md ${styles.columns}`}>
          <div>Number</div>
          <div>Deptartment Name</div>
          <div>Cost Centre</div>
          <div className={styles.button}>Delete</div>
        </div>

        <div className="slideUpAnimation">
          {departmentList && costCentreList
            ? departmentList.map((el, index) => {
                return (
                  <DepartmentRow
                    key={index}
                    department={el}
                    setDepartmentList={setDepartmentList}
                    costCentreList={costCentreList}
                    showModal={showModal}
                  />
                );
              })
            : "No Departments to show"}

          <div className={styles.addDepartment}>
            <Button type="primary" onClick={handleAddDepartment}>
              Add Department
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Departments;
