// Components
import { Typography, Menu, Dropdown } from "antd";
const { Text } = Typography;
import ProfilePicture from "../../../Components/ProfilePicture/ProfilePicture";
import { BsChevronDown } from "react-icons/bs";

// Styles
import styles from "./User.module.css";

const CurrentUser = ({ user }) => {
  const menu = (
    <Menu style={{ marginTop: "0.5rem" }}>
      <Menu.Item key="profile">Profile Info</Menu.Item>
      <Menu.Item key="userAccess">User Access</Menu.Item>
      <Menu.Item key="accountSetting">Account Settings</Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]}>
      <div className={styles.userInfo}>
        <span
          className={styles.usernameText}
        >{`${user.firstName} ${user.lastName}`}</span>

        <div className={styles.profilePictureWrapper}>
          <ProfilePicture user={user} />
        </div>

        <BsChevronDown className={styles.chevron} />
      </div>
    </Dropdown>
  );
};

export default CurrentUser;
