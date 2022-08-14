// Components
import { Select } from "antd";
const { Option } = Select;
import { ProfilePicture } from "../../../Components";
import { Button } from "../../../Components";
import { useSelector } from "react-redux";

// Styles
import styles from "./Header.module.css";

// Functions
import { useFetch } from "../../../Hooks";

// Assets
import { UserAddOutlined, UserOutlined } from "@ant-design/icons";

const Header = ({ currentEmployee, setCurrentEmployee }) => {
  const [employeeList] = useFetch("/employee");
  const { department: departmentList } = useSelector((state) => {
    return state.payroll;
  });

  const handleAddEmployee = () => {
    setCurrentEmployee({});
  };

  function onChange(value) {
    const employee = employeeList.find((el) => {
      return el.eeNum === value;
    });

    setCurrentEmployee(employee);
  }

  const handleFileInputChange = (e) => {
    const imgFile = e.target.files[0];

    if (!imgFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      const base64EncodedImage = reader.result;

      uploadImage(base64EncodedImage);
    };
  };

  const imgMenu = (
    <div className={styles.imgMenu}>
      <ul>
        <li className={styles.fileInputField}>
          <label for="file-upload" className={styles.customFileUpload}>
            Upload Image
            <input
              id="file-upload"
              type="file"
              onChange={handleFileInputChange}
            />
          </label>
        </li>
        <li>Remove Photo</li>
      </ul>
      <div className={styles.imgMenuTriangle}></div>
    </div>
  );

  const employeeRetrieved =
    currentEmployee &&
    employeeList.find((el) => {
      return el._id === currentEmployee._id;
    });

  const uploadImage = async (base64EncodedImage) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/employee/${currentEmployee._id}/upload`,
        {
          headers: {
            "Content-type": "application/json",
            Accept: "applications/json",
            cors: "no-cors",
          },
          method: "POST",
          body: JSON.stringify({ data: base64EncodedImage }),
        }
      );

      const { data } = await response.json();

      setCurrentEmployee((prev) => {
        return { ...prev, employeeImage: data.public_id };
      });
    } catch (e) {}
  };

  const employeeOptions = employeeList?.map((el, index) => {
    return (
      <Option
        key={index}
        value={el.eeNum}
      >{`${el.firstName}  ${el.lastName}`}</Option>
    );
  });

  const employeeDepartment =
    employeeRetrieved &&
    departmentList.find((el) => {
      return el._id === employeeRetrieved.homeDepartment;
    });

  return (
    <div className={styles.header}>
      <div className={styles.employeeProfile}>
        <div className={styles.imgMenuWrapper}>
          <div className={styles.employeeImage}>
            <ProfilePicture
              user={currentEmployee}
              icon={UserOutlined}
              style={{
                color: "#fff",
                fontSize: "2.3rem",
                backgroundColor: "var(--color_gray_2)",
              }}
            />
          </div>
          {currentEmployee && imgMenu}
        </div>

        <div style={{ marginBottom: "0px" }} className={styles.name}>
          {employeeRetrieved ? (
            <>
              <h2>
                {employeeRetrieved.firstName} {employeeRetrieved.lastName}
              </h2>
              <p>
                {employeeRetrieved.eeNum} | {employeeDepartment.name} | Active
              </p>
            </>
          ) : (
            <div className={styles.employeeLoading}>
              <div className={styles.loadingBar}></div>
              <div style={{ width: "60%" }} className={styles.loadingBar}></div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.employeeSelection}>
        <Select
          showSearch
          placeholder="Select an employee"
          optionFilterProp="children"
          onChange={onChange}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          size="large"
          style={{ flexGrow: "1" }}
        >
          {employeeOptions}
        </Select>
        <Button
          onClick={handleAddEmployee}
          style={{ height: "2.5rem", width: "2.5rem" }}
        >
          <UserAddOutlined />
        </Button>
      </div>
    </div>
  );
};

export default Header;
