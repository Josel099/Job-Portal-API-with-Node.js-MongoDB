import React, { useEffect } from "react";
import aboutImg from "../assets/img/about.jpg"; // Ensure this path is correct
import Header from "./Header";
import "aos/dist/aos.css";

const About = () => {

  return (
    <>
      <Header />
      <section id="about" className="about section py-5">
        <div className="container">
          <div className="row gy-4 align-items-center">
            {/* Left Image */}
            <div className="col-lg-6" data-aos="fade-up">
              <img
                src={aboutImg}
                className="img-fluid rounded shadow"
                alt="About"
              />
            </div>

            {/* Right Content */}
            <div
              className="col-lg-6 content"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="fw-bold">Why Choose Our Platform?</h3>
              <p className="fst-italic">
                We provide high-quality courses with professional trainers and a
                hands-on learning approach.
              </p>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle text-primary me-2"></i>
                  High-quality video courses.
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle text-primary me-2"></i>
                  24/7 Student Support.
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle text-primary me-2"></i>
                  Career-oriented curriculum.
                </li>
              </ul>
             
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
