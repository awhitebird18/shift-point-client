import { useNavigate } from "react-router";

// Components
import { BsQuestionCircle, BsSlack } from "react-icons/bs";
import User from "./User/User";
import Notifications from "./Notifications/Notifications";
import DarkMode from "../../Components/DarkMode/DarkMode";

// Styles
import styles from "./TopNav.module.css";

const TopNav = ({ user }) => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/app");
  };

  return (
    <nav className={styles.topNav}>
      <div className={styles.leftSide} onClick={handleNavigateHome}>
        <BsSlack className={styles.logoIcon} />

        <h1 className={styles.logoText}>TIME QP</h1>
      </div>

      <div className={styles.rightSide}>
        <DarkMode />

        <BsQuestionCircle className={styles.helpIcon} />

        <Notifications />

        <User user={user} />
      </div>
    </nav>
  );
};

export default TopNav;
