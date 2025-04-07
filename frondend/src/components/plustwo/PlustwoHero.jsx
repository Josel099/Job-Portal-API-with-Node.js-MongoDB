import React, { useEffect } from "react";
import heroBg from "../../assets/img/events-item-2.jpg";
import Aos from "aos";

const PlustwoHero = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  return (
    <section
      id="hero"
      className="hero section dark-background d-flex align-items-center justify-content-center position-relative"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="container text-center text-white">
        <h2 data-aos="fade-up" data-aos-delay="100">
          Building a Successful Career
        </h2>
        <p data-aos="fade-up" data-aos-delay="200">
          Discover top colleges that offer excellent education and guaranteed
          placements.
        </p>

        <p data-aos="fade-up" data-aos-delay="250">
          <strong>Find the Best Colleges with Top Placements!</strong>
          <br />
          Explore institutions that provide industry connections, career
          guidance, and job opportunities to help you achieve your goals.
        </p>

        <div
          className="d-flex justify-content-center mt-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a href="/plustwoColleges" className="btn btn-primary px-4 py-2">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default PlustwoHero;
