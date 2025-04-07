import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import Header from "./Header";
import jobService from "../services/jobService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true }); // AOS Initialization
    GLightbox({ selector: ".job-lightbox" }); // GLightbox Initialization

    // Fetch jobs using JobService.getAll()
    const fetchJobs = async () => {
      try {
        const response = await jobService.getAll(); // Call JobService
        setJobs(response.data.slice(0, 10)); // Get latest 10 jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h2 className="text-center text-primary fw-bold mb-4">
          Latest Job Openings
        </h2>

        {/* Show loader while fetching */}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {jobs.length > 0 ? (
              <div className="row">
              {jobs.map((job, index) => (
                <div key={job.id} className="col-md-6 col-lg-4 mb-4">
                  <div
                    className="card shadow-lg"
                    data-aos="zoom-in"
                    data-aos-delay={index * 200}
                    style={{
                      border: "none",
                      borderRadius: "15px",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      background: "#fff",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px)";
                      e.currentTarget.style.boxShadow =
                        "0px 10px 20px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="card-body">
                      <h5
                        className="card-title fw-bold"
                        style={{ color: "#333", fontSize: "1.3rem" }}
                      >
                        {job.title}
                      </h5>
                      <h6
                        className="card-subtitle text-muted"
                        style={{ fontSize: "1rem", fontWeight: "500" }}
                      >
                        {job.company} - {job.location}
                      </h6>
                      <p
                        className="card-text text-secondary"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {job.description}
                      </p>
                      <p
                        className="fw-bold"
                        style={{ color: "#28a745", fontSize: "1.1rem" }}
                      >
                        ${job.salary}
                      </p>
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        <strong>Skills:</strong> {job.skills.join(", ")}
                      </p>
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        <strong>Skills:</strong> {job.skills.join(", ")}
                      </p>
  
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        <strong>Experience:</strong> {job.experience}
                      </p>
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        <strong>Required Degree:</strong> {job.requiredDegree}
                      </p>
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        <strong>Minimum Marks:</strong> {job.minMarks}%
                      </p>
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        <strong>Minimum Age:</strong> {job.minAge}
                      </p>
                      <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                        <strong>Required Course:</strong>{" "}
                        {job.requiredCourse?.join(", ")}
                      </p>
  
                      {/* Edit & Delete Buttons */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            ) : (
              <p className="text-center text-muted">No jobs available.</p>
            )}
          </div>
        )}
      </div>
    
    </>
  );
};

export default Jobs;
