import React from "react";
import styles from "./Portfolio.module.scss";

const Portfolio: React.FC = () => {
  return (
    <div className={styles.portfolio}>
      <div className={styles.content}>
        <h1>My Projects</h1>
        <div className={styles.projects}>
          {/* Project cards will go here */}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
