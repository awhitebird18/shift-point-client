import { Form, Input, Select } from "antd";
const { Option } = Select;
import { Button } from "../../../../components";
import Summary from "./Summary";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import styles from "./BasicInfo.module.css";

const BasicInfo = ({ currentUser, setCurrentUser, setUserList }) => {
  const { currentUser: loggedInUser } = useSelector((state) => {
    return state.user;
  });
  // Handle Field Change
  const handleChange = (e, fieldName) => {
    let key = fieldName ? fieldName : e.target.name;
    let value = fieldName ? e : e.target.value;

    setCurrentUser((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleDeleteAccount = () => {
    if (loggedInUser.username === "awhitebird") {
      toast.error("Guest accounts are unable to remove users");
      return;
    }

    fetch(`${process.env.REACT_APP_BASE_URL}/userAccounts/${currentUser._id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        setUserList((prev) => {
          return prev.filter((user) => {
            return user._id !== currentUser._id;
          });
        });

        setCurrentUser(null);
      } else {
        console.error("Something went wrong");
      }
    });
  };

  const handleEmailAccount = () => {
    toast.error("Guest accounts are unable to resend email credentials");
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2>Account Details</h2>

        <Form.Item label="First Name">
          <Input
            name="firstName"
            type="text"
            onChange={handleChange}
            value={currentUser.firstName}
          />
        </Form.Item>
        <Form.Item label="Last Name">
          <Input
            name="lastName"
            onChange={handleChange}
            value={currentUser.lastName}
          />
        </Form.Item>
        <Form.Item label="Username">
          <Input
            name="username"
            onChange={handleChange}
            value={currentUser.username}
          />
        </Form.Item>
        <Form.Item label="Title">
          <Input
            name="title"
            onChange={handleChange}
            value={currentUser.title}
          />
        </Form.Item>
        <Form.Item label="Email Address">
          <Input
            name="email"
            onChange={handleChange}
            value={currentUser.email}
          />
        </Form.Item>

        {!currentUser._id && (
          <div className={styles.formGrid2}>
            <Form.Item label="Password">
              <Input.Password
                name="password"
                type="text"
                onChange={handleChange}
                value={currentUser.password}
              />
            </Form.Item>
            <Form.Item label="Confirm Password">
              <Input.Password
                name="passwordConfirm"
                type="text"
                onChange={handleChange}
                value={currentUser.passwordConfirm}
              />
            </Form.Item>
          </div>
        )}
        {currentUser._id && (
          <>
            <Form.Item label="Account Status">
              <Select
                value={currentUser.active}
                onChange={(e) => handleChange(e, "active")}
              >
                <Option value={true}>Active</Option>
                <Option value={false}>Inactive</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Account Actions">
              <div className={styles.formActions}>
                <Button type="secondary" onClick={handleEmailAccount}>
                  Resend Email
                </Button>
                <Button
                  danger
                  onClick={handleDeleteAccount}
                  style={{ background: "#f5222d" }}
                >
                  Delete Account
                </Button>
              </div>
            </Form.Item>
          </>
        )}
      </div>

      <Summary currentUser={currentUser} />
    </div>
  );
};

export default BasicInfo;
