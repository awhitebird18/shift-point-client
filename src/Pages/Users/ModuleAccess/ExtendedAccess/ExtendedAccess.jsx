// Styles
import styles from "./ExtendedAccess.module.css";

// Components
import { Checkbox } from "antd";
import AccessItem from "../AccessItem/AccessItem";

const ExtendedAccess = ({ userModuleAccess, setCurrentUser, moduleName }) => {
  const handleModuleAccess = (e, type) => {
    setCurrentUser((prev) => {
      const updatedState = {
        ...prev,
        moduleAccess: {
          ...prev.moduleAccess,
          [moduleName]: { ...userModuleAccess, [type]: e },
        },
      };

      return updatedState;
    });
  };

  const fields = () => {
    const fieldsArr = [];
    for (const prop in userModuleAccess) {
      if (
        prop === "active" ||
        prop === "__v" ||
        prop === "access" ||
        prop === "name" ||
        prop === "_id"
      ) {
        continue;
      }

      if (typeof userModuleAccess[prop] === "object") {
        fieldsArr.push(
          <AccessItem
            setCurrentUser={setCurrentUser}
            userModuleAccess={userModuleAccess[prop]}
            section={prop}
            moduleName={moduleName}
          />
        );
      } else if (prop !== "access") {
        fieldsArr.push(
          <li>
            <div className={styles.checkboxGroup}>
              <Checkbox
                checked={userModuleAccess[prop]}
                onChange={(e) => {
                  handleModuleAccess(e.target.checked, prop);
                }}
              />
              <div className={styles.accessItemTitle}>{prop}</div>
            </div>
          </li>
        );
      }
    }

    return fieldsArr;
  };

  return (
    <div className={styles.container}>
      <ul className={styles.accessItems}>{fields()}</ul>
    </div>
  );
};

export default ExtendedAccess;
