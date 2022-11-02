import { ProfilePicture } from "../../../../components";
import styles from "./Header.module.css";

const Header = ({ employee, departments }) => {
  const homeDepartment = departments?.find((el) => {
    return el._id === employee.homeDepartment;
  });

  return (
    <div className={styles.employeeInfo}>
      <div className={styles.imageContainer}>
        <ProfilePicture user={employee} icon={!employee.profileImage && null} />
      </div>

      <div>
        <h3 className={styles.employeeName}>
          {employee.firstName} {employee.lastName}
        </h3>
        <h4 className={styles.employeeDetails}>{`${employee.eeNum} | ${
          homeDepartment && homeDepartment.name ? homeDepartment.name : ""
        } | Hourly`}</h4>
      </div>
    </div>
  );
};

export default Header;
