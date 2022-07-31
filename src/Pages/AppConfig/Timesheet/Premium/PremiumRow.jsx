// Styles
import styles from "./Premium.module.css";

// Components
import { Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const PremiumRow = ({
  premium,
  setPremiumList,
  setIsModalVisible,
  setCurrentPremium,
  earningList,
}) => {
  // Delete Premium
  const handleDelete = () => {
    const url = `${process.env.REACT_APP_BASE_URL}premium/${data._id}`;

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
              return el._id !== data._id;
            }),
          ];
        });
      });
  };

  //   Edit Premium
  const handleEdit = () => {
    setCurrentPremium(premium);
    setIsModalVisible(true);
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
    <div className={`list-item--md ${styles.columns}`}>
      <div>{premium.name}</div>
      <div className="hide--mobile">Multiple</div>
      <div>{earningCode ? earningCode.name : ""}</div>

      <div className={styles.center}>
        <Button onClick={handleEdit}>
          <EditOutlined />
        </Button>
      </div>

      <div className={styles.center}>
        <Button onClick={handleDelete}>
          <DeleteOutlined />
        </Button>
      </div>
    </div>
  );
};

export default PremiumRow;
