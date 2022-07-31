import React, { useState } from 'react';
import { BsChevronDown, BsSave, BsGear, BsGeoAlt } from 'react-icons/bs';
import styles from './controls.module.css';

const Controls = ({ onSave }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <ul className={styles.controls}>
      <li className={styles.controlItem} onClick={() => setCollapsed(!collapsed)}>
        <BsChevronDown className={styles.controlIcon} />
      </li>
      <li className={`${styles.controlItem} ${collapsed ? styles.hidden : ''}`}>
        <BsGeoAlt className={styles.controlIcon} />
      </li>
      <li className={`${styles.controlItem} ${collapsed ? styles.hidden : ''}`}>
        <BsGear className={styles.controlIcon} />
      </li>

      <li className={styles.controlItem}>
        <BsSave className={styles.controlIcon} onClick={onSave} />
      </li>
    </ul>
  );
};

export default Controls;
