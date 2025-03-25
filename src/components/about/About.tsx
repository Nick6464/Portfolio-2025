import React from "react";
import styles from "./About.module.scss";

const About: React.FC = () => {
  return (
    <div className={styles.about}>
      <div className={styles.content}>
        <h1>About Me</h1>
        <p>
          A passionate developer dedicated to creating meaningful web
          experiences.
        </p>
      </div>
    </div>
  );
};

export default About;
