// Styles
import styles from "./index.module.css";

// Components
import { Checkbox } from "antd";

import { Button } from "../../../Components";

const EarningRow = ({ earning, setEarningList, showModal }) => {
  const handleEdit = () => {
    showModal({
      name: "EARNING_CONFIG",
      title: "Edit Earning",
      earning,
      setEarningList,
    });
  };

  // Handle Delete
  const handleDelete = (e) => {
    e.stopPropagation();
    let url = `${process.env.REACT_APP_BASE_URL}/earning/${earning._id}`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      cors: "no-cors",
    }).then(() => {
      setEarningList((prev) => {
        const index = prev.findIndex((el) => {
          return el._id === earning._id;
        });

        prev.splice(index, 1);

        return [...prev];
      });
    });
  };

  return (
    <div className={`list-item--md ${styles.columns}`} onClick={handleEdit}>
      <div className={styles.name}>{earning.name}</div>
      <div className={`hide--tablet ${styles.icon}`}>{earning.rate}</div>
      <div className={`hide--tablet ${styles.icon}`}>
        <Checkbox name="overtimeEligible" checked={earning.overtimeEligible} />
      </div>
      <div className={`hide--tablet ${styles.icon}`}>
        <Checkbox name="primary" checked={earning.primary} />
      </div>

      <div className={styles.icon}>
        <Button
          type="secondary"
          onClick={handleDelete}
          style={{ padding: "0.25rem 0.5rem" }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EarningRow;
