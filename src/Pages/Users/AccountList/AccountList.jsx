// Styles
import styles from "./AccountList.module.css";

// Components
import { Tag } from "antd";

const AccountList = ({ setCurrentUser, userList }) => {
  const handleSelectUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${styles.columns} list-header--md`}>
        <div>First Name</div>
        <div>Last Name</div>
        <div className="hide--mobile">Username</div>
        <div className="hide--medium">Title</div>
        <div className="hide--mobile">Email Address</div>
        <div className="hide--medium">Last Login</div>
        <div>Status</div>
      </div>
      <div className="slideUpAnimation">
        {userList?.map((user) => {
          return (
            <div
              className={`${styles.columns} list-item--md`}
              onClick={() => handleSelectUser(user)}
            >
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div className="hide--mobile">{user.username}</div>
              <div className="hide--medium">{user.title}</div>
              <div className="hide--medium">{user.email}</div>
              <div className="hide--mobile">May 29 2022</div>
              <div>
                <Tag
                  style={{
                    width: "4rem",
                    textAlign: "center",
                  }}
                  color={user.active ? "green" : "red"}
                >
                  {user.active ? "Acitve" : "Inactive"}
                </Tag>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountList;
