// Components
import { Form, Input } from "antd";

// Styles
import styles from "../index.module.css";

const Contact = ({ currentEmployee, setCurrentEmployee }) => {
  return (
    <>
      <div className={styles.formGrid111}>
        <Form.Item label="Home Phone Number">
          <Input
            name="homePhone"
            type="text"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  contact: { ...prev.contact, homePhone: e.target.value },
                };
              })
            }
            value={currentEmployee.contact?.homePhone}
          />
        </Form.Item>
        <Form.Item label="Cell Phone Number">
          <Input
            name="cellPhone"
            type="text"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  contact: { ...prev.contact, cellPhone: e.target.value },
                };
              })
            }
            value={currentEmployee.contact?.cellPhone}
          />
        </Form.Item>
        <Form.Item label="Work Phone Number">
          <Input
            name="workPhone"
            type="text"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  contact: { ...prev.contact, workPhone: e.target.value },
                };
              })
            }
            value={currentEmployee.contact?.workPhone}
          />
        </Form.Item>
      </div>
      <div className={styles.formGrid111}>
        <Form.Item label="Personal Email Address">
          <Input
            name="personalEmail"
            type="text"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  contact: { ...prev.contact, personalEmail: e.target.value },
                };
              })
            }
            value={currentEmployee.contact?.personalEmail}
          />
        </Form.Item>
        <Form.Item label="Work Email Address">
          <Input
            name="workEmail"
            type="text"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  contact: { ...prev.contact, workEmail: e.target.value },
                };
              })
            }
            value={currentEmployee.contact?.workEmail}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default Contact;
