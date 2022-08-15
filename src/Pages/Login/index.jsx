import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import styles from "./index.module.css";

// Components
import { Form, Input, Divider } from "antd";
import brandLogo from "../../Assets/brandLogo.png";
import { Button } from "../../Components";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState();

  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";

  useEffect(() => {
    if (localStorage) {
      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const handleSubmit = async (values) => {
    let login_data = {};

    if (values === "guestAccount") {
      login_data.clientId = "D20003";
      login_data.username = "awhitebird";
      login_data.password = "fish123";
    } else {
      login_data.clientId = values.clientId;
      login_data.username = values.username;
      login_data.password = values.password;
    }

    if (
      !values ||
      !login_data.clientId ||
      !login_data.username ||
      !login_data.password
    ) {
      return;
    }

    // Fetch User
    const { data } = await axios.post("/userAccounts/login", {
      ...login_data,
    });

    if (!data.token) return;

    localStorage.setItem("token", data.token);

    navigate("/app");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.imgWrapper}>
            <img src={brandLogo} alt="" style={{ height: "100%" }} />
          </div>
          <h1
            style={{ margin: "0", paddingLeft: "0.25rem" }}
            className={styles.title}
          >
            Shift Point
          </h1>
        </div>
        <main className={styles.content}>
          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item label="Client Id" name="clientId">
              <Input size="large" style={{ border: "var(--border-input)" }} />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input size="large" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              style={{ boxShadow: "none !important" }}
            >
              <Input.Password size="large" visibilityToggle={false} />
            </Form.Item>

            <Button
              onClick={handleSubmit}
              htmlType="submit"
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Login
            </Button>

            <Divider>Login with Guest Account</Divider>
          </Form>

          <div>
            <Button
              type="secondary"
              style={{ width: "100%" }}
              onClick={() => handleSubmit("guestAccount")}
            >
              Explore Shift Point
            </Button>
          </div>
        </main>
        {/* <div className={styles.footer}>
          <div
            className={styles.url}
          >{`Connected to: ${process.env.REACT_APP_BASE_URL}`}</div>
        </div> */}
      </div>
    </div>
  );
};

export default Login;
