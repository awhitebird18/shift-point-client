import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";

// Components
import { Button } from "../../../Components";
import EarningRow from "./EarningRow";

// Styles
import styles from "./Payment.module.css";

const EmployeePayment = ({
  currentEmployee,
  setCurrentEmployee,
  earningList,
}) => {
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddEarning = () => {
    showModal({
      name: "EARNING_DETAILED",
      title: "Create Earning",
      earningList,
      currentEmployee,
      setCurrentEmployee,
      earning: {},
    });
  };

  return (
    <div>
      <div className={`list-header--md ${styles.columns}`}>
        <div>Name</div>
        <div>Type</div>
        <div>Rate</div>
        <div className="hide--tablet">Effective Date</div>
        <div className="hide--tablet">YTD Totals</div>
      </div>
      <div className={styles.container}>
        {earningList &&
          currentEmployee.earnings.map((el, index) => {
            return (
              <EarningRow
                key={index}
                earning={el}
                earningList={earningList}
                currentEmployee={currentEmployee}
                setCurrentEmployee={setCurrentEmployee}
              />
            );
          })}

        <Button
          onClick={handleAddEarning}
          style={{
            alignSelf: "flex-end",
            margin: "2rem 1rem 0",
            height: "2.5rem",
          }}
        >
          Add Earning
        </Button>
      </div>
    </div>
  );
};

export default EmployeePayment;
