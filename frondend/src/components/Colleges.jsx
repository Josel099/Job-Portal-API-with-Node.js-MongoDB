import React, { useEffect, useState } from "react";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import collegeService from "../services/collegeService";

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
    GLightbox({ selector: ".glightbox" }); // Initialize GLightbox
    // Fetch colleges using CollegeService.getAll()
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await collegeService.getAll(); // Call API
      setColleges(response.data.slice(0, 10)); // Get latest 10 colleges
    } catch (error) {
      console.error("Error fetching colleges:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4">List of Colleges</h2>

        {/* Show loader while fetching */}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {colleges.length > 0 ? (
              <div className="row">
       
              {colleges.map((college, index) => (
                <div key={college.id} className="col-md-6 col-lg-4 mb-4">
                  <div
                    className="card shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay={index * 200}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{college.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {college.location}
                      </h6>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {college.mail}
                      </h6>
                      <p className="fw-bold">Courses Offered:</p>
                      <ul>
                        {college.courses.map((course, i) => (
                          <li key={i}>{course}</li>
                        ))}
                      </ul>
  
                      <p className="fw-bold">Required Stream:</p>
                      <ul>
                        {college.requiredStream?.map((requiredStream, i) => (
                          <li key={i}>{requiredStream}</li>
                        ))}
                      </ul>
  
                      
                    </div>
                  </div>
                </div>
              ))}
          </div>
            ) : (
              <p className="text-center text-muted">No colleges available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Colleges;
