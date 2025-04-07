import { useEffect } from "react";
import detailBg from "../../assets/img/course-details.jpg";
import Aos from "aos";

const CollegeHero = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);

  return (
    <section
      id="hero"
      className="hero section dark-background d-flex align-items-center justify-content-center position-relative"
      style={{
        backgroundImage: `url(${detailBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <div className="container text-center text-white">
        <h2 data-aos="fade-up" data-aos-delay="100">
          Find Your Dream Job,
          <br />
          Build Your Future
        </h2>
        <p data-aos="fade-up" data-aos-delay="200">
          Explore top companies, apply for the best jobs, and start your career
          journey today.
        </p>
        <div
          className="d-flex justify-content-center mt-4"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <a href="/collegeJobs" className="btn btn-primary px-4 py-2">
            Explore Jobs
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollegeHero;
