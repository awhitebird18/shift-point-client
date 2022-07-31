import { useState } from "react";

// Styles
import styles from "./index.module.css";

// Components
import Layout from "./Layout/Layout";
import Header from "./Layout/Header";

const Employees = () => {
  const [currentEmployee, setCurrentEmployee] = useState();

  return (
    <section className={styles.container}>
      <Header
        currentEmployee={currentEmployee}
        setCurrentEmployee={setCurrentEmployee}
      />

      {currentEmployee && (
        <Layout
          currentEmployee={currentEmployee}
          setCurrentEmployee={setCurrentEmployee}
        />
      )}
    </section>
  );
};

export default Employees;
