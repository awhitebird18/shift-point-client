import { Checkbox } from "antd";

// Styles
import styles from "./ModuleAccess.module.css";

// Functions
import { useFetch } from "../../../Hooks";

const ModuleAccess = ({ moduleAccess, setCurrentUser }) => {
  const [modules] = useFetch("module");

  const handleChange = (value, moduleId) => {
    setCurrentUser((prev) => {
      const moduleAccess = [...prev.moduleAccess];

      const assignedModule = moduleAccess.find(
        (el) => el.moduleId === moduleId
      );

      if (!assignedModule) {
        moduleAccess.push({ moduleId, access: value });
      } else {
        assignedModule.access = value;
      }

      return { ...prev, moduleAccess };
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
          const assignedModule = moduleAccess.find(
            (el) => el.moduleId === module._id
          );

          return (
            <div className={styles.moduleRow} key={module._id}>
              <Checkbox
                checked={assignedModule?.access}
                onChange={(e) => handleChange(e.target.checked, module._id)}
                style={{ justifySelf: " center" }}
              />
              <div
                className={styles.moduleName}
              >{`${module.name[0].toUpperCase()}${module.name.substring(
                1
              )}`}</div>
            </div>
          );
        })}
    </>
  );
};

export default ModuleAccess;
