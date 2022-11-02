import styles from "./Premium.module.css";
import { Button } from "../../../../../components";

const PremiumRow = ({
  premium,
  setPremiumList,
  positionList,
  earningList,
  showModal,
}) => {
  // Delete Premium
  const handleDelete = (e) => {
    e.stopPropagation();
    const url = `${process.env.REACT_APP_BASE_URL}/premium/${premium._id}`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      cors: "no-cors",
    })
      .then((res) => {
        return res.json();
      })
      .then((premData) => {
        setPremiumList((prev) => {
          return [
            ...prev.filter((el) => {
              return el._id !== premium._id;
            }),
          ];
        });
      });
  };

  //   Edit Premium
  const handleEdit = () => {
    showModal({
      name: "PREMIUM_CONFIG",
      title: "Edit Premium",
      premium,
      setPremiumList,
      positionList,
      earningList,
    });
  };

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const earningCode = earningList?.find((el) => {
    return el._id === premium.earningId;
  });

  return (
    <div className={`list-item--md ${styles.columns}`} onClick={handleEdit}>
      <div>{premium.name}</div>
      <div className="hide--mobile">Multiple</div>
      <div>{earningCode ? earningCode.name : ""}</div>

      <div className={styles.center}>
        <Button onClick={handleDelete} type="secondary">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PremiumRow;
