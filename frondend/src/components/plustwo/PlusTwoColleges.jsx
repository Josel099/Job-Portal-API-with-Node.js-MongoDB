import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import collegeService from "../../services/collegeService"; // Ensure this service exists
import PlustwoHeader from "./PlustwoHeader";

const PlusTwoColleges = () => {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS

    fetchColleges();
  }, []);

      // Fetch colleges from API
      const fetchColleges = async () => {
        try {
          const response = await collegeService.getAll(); // API call to fetch colleges
          setColleges(response.data); // Store in state
        } catch (error) {
          console.error("Error fetching colleges:", error);
        }
      };

  return (
    <div>
      <PlustwoHeader />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Find the Best Colleges for You</h2>
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
                    <a
                    href={`mailto:${college.mail}`}
                    className="btn btn-primary w-100"
                  >
                    Send Email
                  </a>
                  </div>
                </div>
              </div>
            ))}
     
         
        </div>
      </div>
    </div>
  );
};

export default PlusTwoColleges;
