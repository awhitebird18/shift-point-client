import { useDispatch } from "react-redux";
import { actionCreators } from "../../../State";
import { bindActionCreators } from "redux";

// Components
import { Button } from "../../../Components";
import CostCentreRow from "./Row/Row";

// Styles
import styles from "./CostCentres.module.css";

// Functions
import { useFetch } from "../../../Hooks";

const CostCentres = () => {
  const [costCentreList, setCostCentreList] = useFetch("/costcentre");
  const dispatch = useDispatch();
  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddCostCentre = () => {
    showModal({
      name: "COSTCENTRE_CONFIG",
      title: "Create Department",
      setCostCentreList,
      costCentre: {},
    });
  };

  return (
    <>
      <div>
        <div className={`list-header--md ${styles.columns}`}>
          <div>Number</div>
          <div>Cost Centre Name</div>
          <div>Delete</div>
        </div>
      </div>

      <div className="slideUpAnimation">
        {costCentreList
          ? costCentreList.map((costCentre, index) => {
              return (
                <CostCentreRow
                  key={index}
                  costCentre={costCentre}
                  setCostCentreList={setCostCentreList}
                  showModal={showModal}
                />
              );
            })
          : "No Cost Centres "}

        <div className={styles.addCostCentre}>
          <Button type="primary" onClick={handleAddCostCentre}>
            Add Cost Centre
          </Button>
        </div>
      </div>
    </>
  );
};

export default CostCentres;
