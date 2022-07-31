// Styles
import styles from "./index.module.css";

// Components
import ModuleHeader from "./ModuleHeader/ModuleHeader";
import Filters from "./Filters/Filters";
import Layout from "./Layout/Layout";

const Schedule = () => {
  return (
    <div className={styles.slideIn}>
      <ModuleHeader />

      <main className={styles.sectionBody}>
        <Filters />

        <Layout />
      </main>
    </div>
  );
};

export default Schedule;
