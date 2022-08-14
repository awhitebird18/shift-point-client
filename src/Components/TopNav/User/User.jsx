// Components
import ProfilePicture from "../../../Components/ProfilePicture/ProfilePicture";
import { BsChevronDown } from "react-icons/bs";

// Styles
import styles from "./User.module.css";

const CurrentUser = ({ user }) => {
  return (
    <div className={styles.userInfo}>
      <p
        className={styles.usernameText}
      >{`${user.firstName} ${user.lastName}`}</p>

      <div className={styles.profilePictureWrapper}>
        <ProfilePicture user={user} />
      </div>

      <BsChevronDown className={styles.chevron} />
    </div>
  );
};

export default CurrentUser;
