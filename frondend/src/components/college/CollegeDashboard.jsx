import React from "react";
import CollegeHeader from "./CollegeHeader";
import Hero from "../Hero";
import CollegeHero from "./CollegeHero";

const CollegeDashboard = () => {
  return (
    <>
      <CollegeHeader />
      <main className="main">
        <CollegeHero />
      </main>
    </>
  );
};

export default CollegeDashboard;
