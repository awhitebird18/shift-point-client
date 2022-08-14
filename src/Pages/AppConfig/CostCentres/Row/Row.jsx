// Components
import { Button } from "../../../../Components";

// Styles
import styles from "../CostCentres.module.css";

const Row = ({ costCentre, setCostCentreList, showModal }) => {
  const handleDelete = (e) => {
    e.stopPropagation();

    fetch(`${process.env.REACT_APP_BASE_URL}/costcentre/${costCentre._id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      if (res.status === 204) {
        setCostCentreList((prev) => {
          return prev.filter((el) => {
            return el._id !== costCentre._id;
          });
        });
      }
    });
  };

  const handleEditCostCentre = () => {
    showModal({
      name: "COSTCENTRE_CONFIG",
      title: "Edit Cost Centre",
      costCentre,
      setCostCentreList,
    });
  };

  return (
    <div
      className={`list-item--md ${styles.columns}`}
      onClick={handleEditCostCentre}
    >
      <div className={styles.departmentName}>{costCentre.number}</div>

      <div className={styles.departmentName}>{costCentre.name}</div>

      <Button
        type="secondary"
        onClick={handleDelete}
        style={{ padding: "0.25rem 0.5rem" }}
      >
        Delete
      </Button>
    </div>
  );
};

export default Row;
