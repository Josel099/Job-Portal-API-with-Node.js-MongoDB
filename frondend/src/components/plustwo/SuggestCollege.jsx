import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Glightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import userService from "../../services/userService";
import PlustwoHeader from "./PlustwoHeader";


const SuggestCollege = () => {
  const [colleges, setColleges] = useState([]);
  
  // Retrieve userId from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS animations
    const lightbox = Glightbox(); // Initialize Glightbox

    const fetchColleges = async () => {
      if (!userId) return;
      try {
        const data = await userService.getSuggestedOpportunities(userId); // Fetch API
        console.log(data)
        setColleges(data.suggestedColleges || []);
      } catch (error) {
        console.error("Failed to fetch colleges", error);
      }
    };

    fetchColleges();
  }, [userId]);

  return (
    <>
  <PlustwoHeader />
    <div className="container mt-4">
      <h3 className="text-center" data-aos="fade-up">Suggested Colleges</h3>
      {colleges.length > 0 ? (
        <div className="row">
          {colleges.map((college, index) => (
            <div key={college._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-lg p-3" data-aos="zoom-in">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{college.name}</h5>
                  <h6 className="card-subtitle text-muted">{college.location}</h6>
                  <p className="text-muted"><strong>Email:</strong> {college.mail}</p>
                  <p className="text-muted"><strong>Minimum Marks:</strong> {college.minMarks}</p>
                  <p className="text-muted"><strong>Courses:</strong> {college.courses.join(", ")}</p>
                  
                  <a 
                href={`mailto:${college.mail}?subject=Admission Inquiry: ${college.name}`} 
                className="btn btn-primary mt-2"
              >
                Contact via Email
              </a>
                  {/* Glightbox Content */}
                  <div id={`college-${index}`} className="glightbox-content" style={{ display: "none" }}>
                    <h3>{college.name}</h3>
                    <p><strong>Location:</strong> {college.location}</p>
                    <p><strong>Email:</strong> {college.mail}</p>
                    <p><strong>Minimum Marks:</strong> {college.minMarks}</p>
                    <p><strong>Courses Offered:</strong> {college.courses.join(", ")}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4" data-aos="fade-up">No college suggestions available.</p>
      )}
    </div>
    </>
  );
};

export default SuggestCollege;