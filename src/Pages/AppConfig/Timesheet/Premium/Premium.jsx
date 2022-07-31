import { useState } from "react";

// Styles
import styles from "./Premium.module.css";

// Components
import { Button } from "antd";
import PremiumRow from "./PremiumRow.jsx";
import PremiumModal from "./PremiumModal";

// Functions
import { useFetch } from "../../../../Hooks";

const Premium = () => {
  const [premiumList, setPremiumList] = useFetch("/premium");
  const [positionList] = useFetch("/position");
  const [earningList] = useFetch("/earning");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPremium, setCurrentPremium] = useState();

  const showModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <div>
        <div className={`list-header--md ${styles.columns}`}>
          <div>Name</div>
          <div className="hide--mobile">Eligible Positions</div>
          <div>Earning Code</div>
          <div className={styles.center}>Edit</div>
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
                    setIsModalVisible={setIsModalVisible}
                    setCurrentPremium={setCurrentPremium}
                    earningList={earningList}
                  />
                );
              })
            : "No Premiums to show"}
        </div>
      </div>
      <div className={styles.addPremium}>
        <Button type="primary" onClick={showModal}>
          Add Premium
        </Button>
      </div>

      {currentPremium && (
        <PremiumModal
          currentPremium={currentPremium}
          setCurrentPremium={setCurrentPremium}
          setPremiumList={setPremiumList}
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          positionList={positionList}
          earningList={earningList}
        />
      )}
    </>
  );
};

export default Premium;
