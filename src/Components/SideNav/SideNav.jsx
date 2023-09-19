import styles from "./SideNav.module.css";
import NavLink from "./NavLink.jsx";
import { useFetch } from "../../hooks";
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

  const sections = ["Modules", "Users", "Communication", "Settings"];

  if (!user) return null;

  return (
    <nav className={styles.sideNavMenu}>
      <NavLink
        key="dashboard"
        slug="/app"
        text="Dashboard"
        colorCode="#722ed1"
        icon={BsColumnsGap}
      />
      {modules &&
        sections.map((section, index) => {
          const assignedModules = modules.filter(
            (module) =>
              module.section === section &&
              user.moduleAccess.find((assignedModule) => assignedModule.moduleId === module._id)
                ?.access
          );

          if (assignedModules.length === 0) return;

          return (
            <div key={index}>
              <h5 className={`header-gray hide--large ${styles.header}`}>{section}</h5>

              {user &&
                assignedModules.map((module, index) => {
                  if (!user.moduleAccess.find((el) => el.moduleId === module._id).access) {
                    return;
                  }

                  let icon;
                  switch (module._id) {
                    // Dashboard
                    case "62cb18a616b108c44fdf2ae3":
                      icon = BsColumnsGap;
                      break;
                    // Timesheet
                    case "62416fb6f3dc27c18534d150":
                      icon = BsClock;
                      break;
                    // Scheduler
                    case "62cb212316b108c44fdf2ae4":
                      icon = BsCalendar4Week;
                      break;
                    //  Employees
                    case "62417015f3dc27c18534d158":
                      icon = BsPeople;
                      break;
                    // Users
                    case "62416ff5f3dc27c18534d154":
                      icon = BsPerson;
                      break;
                    // Settings
                    case "62417021f3dc27c18534d15a":
                      icon = BsGear;
                      break;
                    // Messaging
                    case "62d4248d027d710880de3414":
                      icon = BsChatDots;
                      break;
                    // Task List
                    case "62d427ac027d710880de3415":
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
        colorCode="rgba(255,255,255,0.1)"
        icon={BsArrowLeftSquare}
        iconStyles={{
          color: "var(--color-text)",
          fontSize: "1.1rem",
        }}
      />
    </nav>
  );
};

export default SideNav;
