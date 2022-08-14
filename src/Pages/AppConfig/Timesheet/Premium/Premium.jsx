import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../../../State";
import { bindActionCreators } from "redux";

// Styles
import styles from "./Premium.module.css";

// Components
import { Button } from "../../../../Components";
import PremiumRow from "./PremiumRow.jsx";

// Functions
import { useFetch } from "../../../../Hooks";

const Premium = () => {
  const [premiumList, setPremiumList] = useFetch("/premium");
  const [positionList] = useFetch("/position");
  const [earningList] = useFetch("/earning");
  const dispatch = useDispatch();

  const { showModal } = bindActionCreators(actionCreators, dispatch);

  const handleAddPremium = () => {
    showModal({
      name: "PREMIUM_CONFIG",
      title: "Create Premium",
      premium: {},
      setPremiumList,
      positionList,
      earningList,
    });
  };

  return (
    <>
      <div>
        <div className={`list-header--md ${styles.columns}`}>
          <div>Name</div>
          <div className="hide--mobile">Eligible Positions</div>
          <div>Earning Code</div>
          <div className={styles.center}>Delete</div>
        </div>
        <div className="slideUpAnimation">
          {premiumList && premiumList.length > 0
            ? premiumList.map((el, index) => {
                return (
                  <PremiumRow
                    key={index}
                    premium={el}
                    setPremiumList={setPremiumList}
                    showModal={showModal}
                    positionList={positionList}
                    earningList={earningList}
                  />
                );
              })
            : "No Premiums to show"}
        </div>
      </div>
      <div className={styles.addPremium}>
        <Button
          type="primary"
          onClick={handleAddPremium}
          style={{ width: "9rem" }}
        >
          Add Premium
        </Button>
      </div>
    </>
  );
};

export default Premium;
