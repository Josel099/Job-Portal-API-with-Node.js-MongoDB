import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "aos/dist/aos.css";
import "glightbox/dist/css/glightbox.min.css";
import "../assets/css/main.css"; // Adjust the path as needed
import Hero from "./Hero";
import Header from "./Header";


const Index = () => {
  return (
    <div>
      <Header/>
      <main className="main">
        <Hero />
      </main>
    </div>
  );
};

export default Index;
