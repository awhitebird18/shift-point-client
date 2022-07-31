import { useNavigate } from "react-router-dom";

// Styles
import styles from "./index.module.css";

// Components
import { Form, Input, Button } from "antd";

import { DingdingOutlined } from "@ant-design/icons";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    if (!values || !values.clientId || !values.username || !values.password) {
      return;
    }

    const login_data = {
      clientId: values.clientId,
      username: values.username,
      password: values.password,
    };

    const { data } = await axios.post("/userAccounts/login", {
      ...login_data,
    });
    console.log(data);

    if (!data.token) return;

    localStorage.setItem("token", data.token);

    navigate("/app");
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <DingdingOutlined
            style={{
              fontSize: "2.5rem",
              color: "var(--color-primary)",
            }}
          />
          <h2
            style={{ margin: "0", paddingLeft: "0.25rem" }}
            className={styles.title}
          >
            TIME QP
          </h2>
        </div>
        <main className={styles.content}>
          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item label="Client Id" name="clientId">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input size="large" />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password size="large" style={{ background: "inherit" }} />
            </Form.Item>

            <Button
              style={{
                background: "var(--color-primary)",
                borderColor: "var(--color-primary)",
                color: "#fff",
              }}
              block
              size="large"
              onClick={handleSubmit}
              htmlType="submit"
            >
              Submit
            </Button>
          </Form>
        </main>
        <div className={styles.footer}>
          <div
            className={styles.url}
          >{`Connected to: ${process.env.REACT_APP_BASE_URL}`}</div>
          <div>ReacTime &copy;</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
