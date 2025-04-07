import React, { useEffect } from "react";
import heroBg from "../assets/img/hero-bg.jpg";
import detailBg from "../assets/img/course-details.jpg";
import Aos from "aos";

const Hero = () => {
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
          Learning Today,
          <br />
          Leading Tomorrow
        </h2>
        <p data-aos="fade-up" data-aos-delay="200">
          We are a team of talented designers making websites with Bootstrap.
        </p>
        <div
          className="d-flex justify-content-center mt-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a href="/login" className="btn btn-primary px-4 py-2">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
