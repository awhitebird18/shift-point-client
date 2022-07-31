// Components
import { Button } from "antd";
import CostCentreRow from "./Row/Row";

// Styles
import styles from "./CostCentres.module.css";

// Functions
import { useFetch } from "../../../Hooks";

const CostCentres = () => {
  const [costCentreList, setCostCentreList] = useFetch("/costcentre");
  const handleAddCostCentre = () => {
    setCostCentreList((prev) => {
      return [...prev, { name: "", number: "" }];
    });
  };

  return (
    <>
      <div>
        <div className={`list-header--md ${styles.columns}`}>
          <div className={styles.departmentName}>Number</div>
          <div className={styles.departmentName}>Cost Centre Name</div>
          <div className={styles.button}>Edit</div>
          <div className={styles.button}>Delete</div>
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
