import { Link } from "react-router-dom";

// Components
import { Typography } from "antd";
const { Text } = Typography;

// Styles
import styles from "./NavLink.module.css";

const NavLink = ({ slug, icon: Icon, text, colorCode, iconStyles }) => {
  return (
    <Link to={slug} style={{ color: "inherit" }}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.icon} style={{ backgroundColor: colorCode }}>
            <Icon style={{ color: "#fff", ...iconStyles }} />
          </div>

          <p className={styles.menuItemText}>{text}</p>
        </div>
      </div>
    </Link>
  );
};

export default NavLink;
