import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { Form, Input, Divider } from "antd";
import brandLogo from "../../assets/brandLogo.png";
import { Button } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState();
  const [formData, setFormData] = useState({
    clientId: "",
    username: "",
    password: "",
  });

  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const handleSubmit = async (guestAccount) => {
    let login_data = {};

    if (guestAccount) {
      login_data.clientId = process.env.REACT_APP_LOGIN_CLIENT;
      login_data.username = process.env.REACT_APP_LOGIN_USERNAME;
      login_data.password = process.env.REACT_APP_LOGIN_PASSWORD;
    } else {
      login_data.clientId = formData.clientId;
      login_data.username = formData.username;
      login_data.password = formData.password;
    }

    console.log(login_data);

    if (!login_data.clientId || !login_data.username || !login_data.password) {
      toast.error("Missing credentials");

      return;
    }

    // Fetch User
    try {
      const { data } = await axios.post("/userAccounts/login", login_data);
      if (!data.token) throw error;

      localStorage.setItem("token", data.token);

      axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token");

      navigate("/app");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleChange = (field, value) => {
    if (!field || !value) return;
    setFormData((state) => {
      const stateCopy = { ...state };

      stateCopy[field] = value;

      return stateCopy;
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.imgWrapper}>
            <img src={brandLogo} alt="" style={{ height: "100%" }} />
          </div>
          <h1 style={{ margin: "0", paddingLeft: "0.25rem" }} className={styles.title}>
            Shift Point
          </h1>
        </div>
        <main className={styles.content}>
          <Form layout="vertical" autoComplete="off">
            <Form.Item label="Client Id" name="clientId">
              <Input
                size="large"
                style={{ border: "var(--border-input)" }}
                onChange={(e) => handleChange("clientId", e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Username" name="username">
              <Input size="large" onChange={(e) => handleChange("username", e.target.value)} />
            </Form.Item>
            <Form.Item label="Password" name="password" style={{ boxShadow: "none !important" }}>
              <Input.Password
                size="large"
                visibilityToggle={false}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </Form.Item>

            <Button onClick={() => handleSubmit(null)} style={{ width: "100%", marginTop: "1rem" }}>
              Login
            </Button>

            <Divider>Login with Guest Account</Divider>
          </Form>

          <div>
            <Button type="secondary" style={{ width: "100%" }} onClick={() => handleSubmit("guestAccount")}>
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
