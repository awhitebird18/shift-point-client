// React
import { useState } from "react";

// Components
import ExtendedAccess from "./ExtendedAccess/ExtendedAccess";
import { DownOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";

// Styles
import styles from "./ModuleAccess.module.css";

// Functions
import { useFetch } from "../../../Hooks";

const ModuleAccess = ({ currentUser, setCurrentUser }) => {
  const [modules] = useFetch("module");
  const [currentModule, setCurrentModule] = useState(null);

  const handleModuleChange = (e, module) => {
    e.stopPropagation();
    setCurrentUser((prev) => {
      return {
        ...prev,
        moduleAccess: {
          ...prev.moduleAccess,
          [module]: { ...prev.moduleAccess[module], access: e.target.checked },
        },
      };
    });
  };

  const handleShowExtendedModule = (e, module) => {
    setCurrentModule((prev) => {
      if (prev === module) {
        return null;
      }

      return module;
    });
  };

  return (
    <>
      <div className={styles.moduleRow}>
        <div style={{ justifySelf: " center" }}>Access</div>
        <div>Module Name</div>
        <div className={styles.extendedIcon}>More</div>
      </div>
      {modules
        ?.filter((module) => {
          return module.active;
        })
        .map((module) => {
          return (
            <>
              <div
                className={styles.moduleRow}
                key={module._id}
                onClick={(e) => handleShowExtendedModule(e, module.name)}
              >
                <Checkbox
                  checked={currentUser?.moduleAccess[module.name]?.access}
                  onChange={(e) => handleModuleChange(e, module.name)}
                  style={{ justifySelf: " center" }}
                />
                <div
                  className={styles.moduleName}
                >{`${module.name[0].toUpperCase()}${module.name.substring(
                  1
                )}`}</div>

                <div
                  className={
                    currentModule === module.name
                      ? styles.extendedIconActive
                      : styles.extendedIcon
                  }
                >
                  <DownOutlined />
                </div>
              </div>
              {currentModule === module.name && (
                <ExtendedAccess
                  userModuleAccess={currentUser.moduleAccess[module.name]}
                  setCurrentUser={setCurrentUser}
                  moduleName={module.name}
                />
              )}
            </>
          );
        })}
    </>
  );
};

export default ModuleAccess;
