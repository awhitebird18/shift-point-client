import { useState } from "react";

// Styles
import styles from "./EarningList.module.css";

// Components
import EarningRow from "./EarningRow";
import { Button } from "antd";

// Fetch
import { useFetch } from "../../../Hooks";

const EarningList = () => {
  const [isEditing, setIsEditing] = useState("");
  const [earningList, setEarningList] = useFetch("/earning");

  const handleAddEarning = () => {
    const tempId = Math.floor(Math.random() * 10000);
    setIsEditing(tempId);
    setEarningList((prev) => {
      prev.push({
        name: "",
        overtimeEligible: false,
        tempId,
      });

      return [...prev];
    });
  };

  return (
    <>
      <div className={`list-header--md ${styles.columns}`}>
        <div className={styles.name}>Name</div>
        <div className={styles.name}>Type</div>
        <div className="hide--tablet">Global Rate</div>
        <div className="hide--tablet">Overtime</div>
        <div className="hide--tablet">Primary</div>
        <div>Edit</div>
        <div>Delete</div>
      </div>

      <div className="slideUpAnimation">
        {earningList
          ? earningList.map((el, index) => {
              return (
                <EarningRow
                  key={index}
                  earning={el}
                  setEarningList={setEarningList}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              );
            })
          : "No Earnings to show"}
        <div className={styles.addEarning}>
          <Button type="primary" onClick={handleAddEarning}>
            Add Earning
          </Button>
        </div>
      </div>
    </>
  );
};

export default EarningList;
