// Styles
import styles from "./AccessItem.module.css";

// Modules
import { Checkbox } from "antd";

const AccessItem = ({
  userModuleAccess,
  setCurrentUser,
  section,
  moduleName,
}) => {
  const handleChange = (e, subtype) => {
    setCurrentUser((prev) => {
      const updatedState = {
        ...prev,

        moduleAccess: {
          ...prev.moduleAccess,

          [moduleName]: {
            ...prev.moduleAccess[moduleName],
            [section]: {
              ...prev.moduleAccess[moduleName][section],
              [subtype]: e,
            },
          },
        },
      };

      if (subtype === "access" && e === false) {
        updatedState.moduleAccess[moduleName][section].write = false;
      }

      return updatedState;
    });
  };

  return (
    <li className={styles.accessItems_row}>
      <div className={styles.checkboxGroup}>
        <Checkbox
          checked={userModuleAccess.access}
          onChange={(e) => {
            handleChange(e.target.checked, "access");
          }}
        />
        <div className={styles.accessItemTitle}>{`${section
          .substring(0, 1)
          .toUpperCase()}${section.substring(1).toLowerCase()}`}</div>
      </div>
      {userModuleAccess.access && (
        <div className={styles.checkboxGroup}>
          <Checkbox
            checked={userModuleAccess.write}
            onChange={(e) => {
              handleChange(e.target.checked, "write");
            }}
          />
          <div className={styles.accessItemTitle}>Allow Changes?</div>
        </div>
      )}
    </li>
  );
};

export default AccessItem;
