import styles from "./Header.module.css";
import { Select } from "antd";
const { Option } = Select;
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { ProfilePicture, Button } from "../../../../components";

const Header = ({ currentUser, setCurrentUser, userList }) => {
  function onChange(value) {
    const employee = userList.find((el) => {
      return el._id === value;
    });

    if (!employee) return;

    setCurrentUser(employee);
  }

  function createNewUser() {
    setCurrentUser({
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
      departments: [],
      clientId: "D20003",
      title: "",
      active: true,
      email: "",
      profileImage: "",
      preferences: {
        colorCode: "",
      },
      moduleAccess: [],
      createdAt: new Date(Date.now()).toDateString(),
      updatedAt: "",
    });
  }

  const employeeOptions = userList.map((el, index) => {
    return (
      <Option
        key={index}
        value={el._id}
      >{`${el.firstName}  ${el.lastName}`}</Option>
    );
  });

  const userFound =
    currentUser &&
    userList.find((user) => {
      return user._id === currentUser._id;
    });

  return (
    <div className={styles.header}>
      <div className={styles.userProfile}>
        <div className={styles.imageWrapper}>
          <ProfilePicture
            user={currentUser}
            icon={UserOutlined}
            style={{
              backgroundColor: "rgba(220, 220, 220, 0.6)",
              color: "#fff",
              fontSize: "2.3rem",
            }}
          />
        </div>
        <h2 className={styles.title}>
          {currentUser?._id
            ? `${userFound.firstName} ${userFound.lastName}`
            : currentUser
            ? "Create New User"
            : "User Account List"}
        </h2>
      </div>

      <div className={styles.formControls}>
        <Select
          showSearch
          placeholder="Select a User"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          size="large"
          className={styles.select}
          style={{ flexGrow: "1" }}
          value={currentUser?._id}
        >
          {employeeOptions}
        </Select>

        {/* Create New User Button */}
        <Button
          size="large"
          style={{
            marginLeft: "0.5rem",
            width: "2.5rem",
            padding: "0",
            borderRadius: "0.3rem",
            height: "2.5rem",
          }}
          type="primary"
          onClick={createNewUser}
        >
          <UserAddOutlined style={{ fontSize: "1.3rem" }} />
        </Button>
      </div>
    </div>
  );
};

export default Header;
