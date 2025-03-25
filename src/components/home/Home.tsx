import React from "react";
import styles from "./Home.module.scss";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      <div className={styles.content}>
        <h1>Welcome to My Portfolio</h1>
        <p>Full Stack Developer | Creative Thinker | Problem Solver</p>
      </div>
    </div>
  );
};

export default Home;
