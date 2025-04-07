import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import "aos/dist/aos.css";
import Aos from "aos";
import CollegeHeader from "./CollegeHeader";
import jobService from "../../services/jobService";

const CollegeJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 500 });
    fetchJobs();
  }, []);

  // Fetch all college jobs
  const fetchJobs = async () => {
    try {
      const response = await jobService.getAll();
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Open mail client with pre-filled details
  const handleSendMail = (job) => {
    const email = "hr@example.com"; // Change if needed
    const subject = encodeURIComponent(`Application for ${job.title}`);
    const body = encodeURIComponent(
      `Dear Hiring Manager,\n\nI am interested in applying for the position of ${job.title} at ${job.company}.\n\nLooking forward to your response.\n\nBest regards,\n[Your Name]`
    );

    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <CollegeHeader />

      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          padding: "50px 0",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      >
        <div className="container mt-4">
          <h2 className="text-center text-white fw-bold mb-4">
            College Job Listings
          </h2>

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
                      <strong>Contact Email:</strong> {job.mail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollegeJobs;
