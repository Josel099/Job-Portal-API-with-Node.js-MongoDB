import React from "react";
import aboutImg from "../../assets/img/about-2.jpg";
import PlustwoHeader from "./PlustwoHeader";
import "aos/dist/aos.css";

const PlustwoAbout = () => {
  return (
    <>
      <PlustwoHeader />
      <section id="about" className="about section py-5 bg-light">
        <div className="container">
          <div className="row gy-5 align-items-center">
            {/* Left Content */}
            <div className="col-lg-6" data-aos="fade-up">
              <h2 className="fw-bold text-primary">
                Find the Best Colleges for You
              </h2>
              <p className="lead text-dark">
                Discover top colleges based on your marks, preferences, and
                career goals.
              </p>
              <ul className="list-unstyled">
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
                  Personalized recommendations based on your marks.
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
                  Compare colleges and courses easily.
                </li>
                <li className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill text-success me-2 fs-5"></i>
                  Get insights on scholarships and career paths.
                </li>
              </ul>
              <button className="btn btn-primary mt-3">Explore Colleges</button>
            </div>

            {/* Right Image */}
            <div className="col-lg-6" data-aos="fade-left">
              <img
                src={aboutImg}
                className="img-fluid rounded shadow"
                alt="Find Best Colleges"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlustwoAbout;
