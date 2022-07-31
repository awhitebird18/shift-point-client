// Components
import { Form, Input } from "antd";

// Styles
import styles from "../index.module.css";
import "../sharedStyles.css";

const Address = ({ currentEmployee, setCurrentEmployee }) => {
  return (
    <>
      <div className={styles.formGrid111}>
        <Form.Item label="Street Address">
          <Input
            name="streetAddress"
            type="text"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  address: { ...prev.address, street: e.target.value },
                };
              })
            }
            value={currentEmployee?.address?.streetAddress}
          />
        </Form.Item>
        <Form.Item label="City">
          <Input
            name="city"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  address: { ...prev.address, city: e.target.value },
                };
              })
            }
            value={currentEmployee?.address?.city}
          />
        </Form.Item>
        <Form.Item label="Postal Code">
          <Input
            name="postalCode"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  address: { ...prev.address, postalCode: e.target.value },
                };
              })
            }
            value={currentEmployee?.address?.postalCode}
          />
        </Form.Item>
      </div>

      <div className={styles.formGrid111}>
        <Form.Item label="Province">
          <Input
            name="province"
            type="text"
            onChange={(e) =>
              setCurrentEmployee((prev) => {
                return {
                  ...prev,
                  address: { ...prev.address, province: e.target.value },
                };
              })
            }
            value={currentEmployee?.address?.province}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default Address;
