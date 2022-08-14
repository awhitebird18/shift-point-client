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

      <section className={styles.sectionBody}>
        <Filters />

        <Layout />
      </section>
    </div>
  );
};

export default Schedule;
