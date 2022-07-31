// Styles
import styles from "./SideNav.module.css";

// Components
import NavLink from "./NavLink.jsx";

// Functions
import { useFetch } from "../../Hooks";

import {
  BsClock,
  BsCalendar4Week,
  BsColumnsGap,
  BsFileText,
  BsPeople,
  BsGear,
  BsPerson,
  BsArrowLeftSquare,
  BsChatDots,
  BsListTask,
} from "react-icons/bs";

const SideNav = ({ user }) => {
  const [modules] = useFetch("/module");

  // const sections = ["Modules", "Reporting", "Users", "Communication"];
  const sections = ["Modules", "Users", "Communication"];

  return (
    <nav className={styles.sideNavMenu}>
      <NavLink
        key="dashboard"
        slug="/app"
        text="Dashboard"
        colorCode="#722ed1"
        icon={BsColumnsGap}
      />
      {sections.map((section, index) => {
        return (
          <div key={index}>
            <h5 className={`header-gray hide--large ${styles.header}`}>
              {section}
            </h5>

            {user &&
              modules
                ?.filter((module) => module.active)
                .map((module, index) => {
                  if (
                    (module.name !== "Dashboard" &&
                      !user.moduleAccess[module.name.toLowerCase()]?.access) ||
                    module.section !== section
                  ) {
                    return;
                  }

                  let icon;
                  switch (module.name) {
                    case "Dashboard":
                      icon = BsColumnsGap;
                      break;
                    case "Timesheet":
                      icon = BsClock;
                      break;
                    case "Scheduler":
                      icon = BsCalendar4Week;
                      break;
                    case "Reports":
                      icon = BsFileText;
                    case "Employees":
                      icon = BsPeople;
                      break;
                    case "Users":
                      icon = BsPerson;
                      break;
                    case "Settings":
                      icon = BsGear;
                      break;
                    case "Messaging":
                      icon = BsChatDots;
                      break;
                    case "TaskList":
                      icon = BsListTask;
                      break;

                    default:
                      icon = BsFileText;
                      break;
                  }

                  return (
                    <NavLink
                      slug={module.slug}
                      text={module.name}
                      colorCode={module.colorCode}
                      icon={icon}
                      key={index}
                    />
                  );
                })}
          </div>
        );
      })}

      <NavLink
        key="logout"
        slug="/"
        text="Logout"
        colorCode="#ffffff"
        icon={BsArrowLeftSquare}
        iconStyles={{ color: "#595959", fontSize: "1.1rem" }}
      />
    </nav>
  );
};

export default SideNav;
