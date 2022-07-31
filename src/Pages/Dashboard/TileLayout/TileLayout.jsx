// Styles
import styles from "./TileLayout.module.css";

const TileContainer = ({
  title,
  children,
  headerStyles,
  containerStyles,
  contentStyles,
  headerComponent,
  onHeaderClick,
}) => {
  return (
    <section className={styles.container} style={containerStyles}>
      <div className={styles.header} style={headerStyles}>
        <span>{title}</span>

        <div className={styles.iconContainer} onClick={onHeaderClick}>
          {headerComponent}
        </div>

        <div className={styles.header_border}></div>
      </div>
      <div className={styles.content} style={contentStyles}>
        {children}
      </div>
    </section>
  );
};

export default TileContainer;
