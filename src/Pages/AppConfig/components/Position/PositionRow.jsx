import styles from "./index.module.css";
import { Button } from "../../../../components";

const PositionRow = ({
  position,
  setPositionList,
  departmentList,
  earningList,
  premiumList,
  showModal,
}) => {
  const earning = earningList.find((el) => {
    return el._id === position.earningId;
  });

  const department = departmentList.find((el) => {
    return el._id === position.departmentId;
  });

  // Handle Delete position
  const handleDelete = (e) => {
    e.stopPropagation();
    const url = `${process.env.REACT_APP_BASE_URL}/position/${position._id}`;

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
      .then((data) => {
        setPositionList((prev) => {
          return [
            ...prev.filter((el) => {
              return el._id !== data._id;
            }),
          ];
        });
      });
  };

  // Handle Edit Position
  const handleEdit = () => {
    showModal({
      name: "POSITION_CONFIG",
      title: "Edit Position",
      position,
      departmentList,
      earningList,
      premiumList,
      setPositionList,
    });
  };

  let premium =
    position?.premium.length === 0
      ? "None"
      : position?.premium.length > 1
      ? "Multiple"
      : premiumList.find((premiumEl) => {
          return premiumEl._id === position.premium[0];
        })?.name;

  return (
    <div className={`list-item--md ${styles.columns}`} onClick={handleEdit}>
      <div>{position.name}</div>
      <div>{department && department.name}</div>
      <div className="hide--tablet">{earning && earning.name}</div>
      <div className="hide--tablet">{premium}</div>
      <div className={styles.remove}>
        <Button type="secondary" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PositionRow;
