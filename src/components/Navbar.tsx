import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.scss";

const links = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "About",
    to: "/about",
  },
  {
    name: "Portfolio",
    to: "/portfolio",
  },
];

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.to}
            className={`${styles.link} ${
              location.pathname === link.to ? styles.active : ""
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
