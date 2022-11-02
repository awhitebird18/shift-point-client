import { useState } from "react";
import styles from "./index.module.css";
import Layout from "./components/Layout/Layout";
import Header from "./components/Layout/Header";

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
