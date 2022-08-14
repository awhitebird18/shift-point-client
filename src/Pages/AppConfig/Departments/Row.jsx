// Styles
import styles from "./Departments.module.css";

// Components
import { Button } from "../../../Components";

const DepartmentRow = ({
  department,
  setDepartmentList,
  costCentreList,
  showModal,
}) => {
  const handleDelete = (e) => {
    e.stopPropagation();

    if (!department._id) {
      return;
    }
    let url = `${process.env.REACT_APP_BASE_URL}/department/${department._id}`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "DELETE",
      cors: "no-cors",
    }).then(() => {
      setDepartmentList((prev) => {
        const index = prev.findIndex((el) => {
          return el._id === department._id;
        });

        prev.splice(index, 1);

        return [...prev];
      });
    });
  };

  const handleEditDepartment = () => {
    showModal({
      name: "DEPARTMENT_CONFIG",
      title: "Edit Department",
      costCentreList,
      setDepartmentList,
      department,
    });
  };

  const costCentre = costCentreList.find((costCentre) => {
    return costCentre._id === department.costCentreId;
  });

  return (
    <div
      className={`list-item--md ${styles.columns}`}
      onClick={handleEditDepartment}
    >
      <div>{department.number}</div>
      <div>{department.name}</div>
      <div>{costCentre?.name}</div>

      <div className={styles.center}>
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

export default DepartmentRow;
