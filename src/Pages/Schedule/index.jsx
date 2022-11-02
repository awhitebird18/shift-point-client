import styles from "./index.module.css";
import ModuleHeader from "./components/ModuleHeader/ModuleHeader";
import Filters from "./components/Filters/Filters";
import Layout from "./components/Layout/Layout";

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
