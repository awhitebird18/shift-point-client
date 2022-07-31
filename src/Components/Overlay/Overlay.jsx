// React
import React from 'react';

// Styles
import styles from './overlay.module.css';

const Loader = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.circle}></div>
    </div>
  );
};

export default Loader;
