import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import About from "./about/About";
import Portfolio from "./portfolio/Portfolio";
import "./BaseLayout.module.scss";
import Navbar from "./Navbar";

const BaseLayout: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  );
};

export default BaseLayout;
