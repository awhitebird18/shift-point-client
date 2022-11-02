import { useNavigate } from "react-router";

// Components
import User from "./User/User";
import Notifications from "./Notifications/Notifications";
import DarkMode from "../../components/DarkMode/DarkMode";
import brandLogo from "../../assets/brandLogo.png";

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
        <div className={styles.logoWrapper}>
          <img src={brandLogo} alt="/" className={styles.logo} />
        </div>

        <h1 className={styles.logoText}>Shift Point</h1>
      </div>

      <div className={styles.rightSide}>
        <DarkMode />

        <Notifications />

        <User user={user} />
      </div>
    </nav>
  );
};

export default TopNav;
