// Styles
import styles from "./TileManager.module.css";

// Components
import { BsFillGearFill } from "react-icons/bs";
import TileLayout from "../TileLayout/TileLayout";

const TileManager = () => {
  return (
    <TileLayout
      headerStyles={{
        display: "none",
      }}
      contentStyles={{ height: " 100%" }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <BsFillGearFill className={styles.icon} />
          <h2 className={styles.title}>Tile Manager</h2>
        </div>
        <span className={styles.explanation}>
          Click to customize home screen tiles
        </span>
      </div>
    </TileLayout>
  );
};

export default TileManager;
