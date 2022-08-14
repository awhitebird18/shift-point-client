import { useState } from "react";

// Styles
import styles from "./AccountList.module.css";

import { BsChevronUp, BsChevronDown, BsChevronExpand } from "react-icons/bs";

// Components
import { Tag } from "antd";

const AccountList = ({ setCurrentUser, userList }) => {
  const [sort, setSort] = useState({
    sortBy: "username",
    type: "alpha",
    direction: "up",
  });

  const handleSelectUser = (user) => {
    setCurrentUser(user);
  };

  const handleSort = (sortBy, type) => {
    setSort((state) => {
      let direction = "up";

      if (state.sortBy === sortBy) {
        direction = state.direction === "up" ? "down" : "up";
      }

      return {
        sortBy,
        type: type ? type : "alpha",
        direction,
      };
    });
  };

  const sortUsers = (userList) => {
    let sortedList;

    if (sort.type === "alpha") {
      sortedList = userList.sort((a, b) => {
        if (sort.direction === "up") {
          return a[sort.sortBy].localeCompare(b[sort.sortBy]);
        } else {
          return b[sort.sortBy].localeCompare(a[sort.sortBy]);
        }
      });
    }
    if (sort.type === "numeric") {
      sortedList = userList.sort((a, b) => {
        if (sort.direction === "up") {
          return +a[sort.sortBy] - +b[sort.sortBy];
        } else {
          return +b[sort.sortBy] - +a[sort.sortBy];
        }
      });
    }

    return sortedList;
  };

  const sortIcon = (field) => {
    if (sort.sortBy === field) {
      if (sort.direction === "up") {
        return <BsChevronUp className={styles.sortIcon} />;
      }

      if (sort.direction === "down") {
        return <BsChevronDown className={styles.sortIcon} />;
      }
    }

    return <BsChevronExpand className={styles.sortIcon} />;
  };

  const sortedUsers = sortUsers(userList);

  return (
    <div className={styles.container}>
      <div className={`${styles.header} ${styles.columns} list-header--md`}>
        <div>
          First Name
          <span onClick={() => handleSort("firstName")}>
            {sortIcon("firstName")}
          </span>
        </div>
        <div>
          Last Name
          <span onClick={() => handleSort("lastName")}>
            {sortIcon("lastName")}
          </span>
        </div>
        <div className="hide--mobile">
          <p>Username</p>
          <span onClick={() => handleSort("username")}>
            {sortIcon("username")}
          </span>
        </div>
        <div className="hide--medium">
          Title
          <span onClick={() => handleSort("title")}>{sortIcon("title")}</span>
        </div>
        <div className="hide--mobile">
          Email Address
          <span onClick={() => handleSort("email")}>{sortIcon("email")}</span>
        </div>
        <div className="hide--medium">
          Last Login
          <span>{sortIcon("lastLogin")}</span>
        </div>
        <div>
          Status
          <span onClick={() => handleSort("active", "numeric")}>
            {sortIcon("active")}
          </span>
        </div>
      </div>
      <div className="slideUpAnimation">
        {sortedUsers?.map((user) => {
          return (
            <div
              className={`${styles.columns} list-item--md`}
              onClick={() => handleSelectUser(user)}
            >
              <div>{user.firstName}</div>
              <div>{user.lastName}</div>
              <div className="hide--mobile">{user.username}</div>
              <div className="hide--medium">{user.title}</div>
              <div className="hide--medium" style={{ overflow: "hidden" }}>
                {user.email}
              </div>
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
