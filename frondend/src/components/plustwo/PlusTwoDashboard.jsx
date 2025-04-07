import React from "react";
import PlustwoHeader from "./PlustwoHeader";
import PlustwoHero from "./PlustwoHero";

const PlusTwoDashboard = () => {
  return (
    <>
      <PlustwoHeader />
      <main className="main">
        <PlustwoHero />
      </main>
    </>
  );
};

export default PlusTwoDashboard;
