import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';
import userService from '../../services/userService';
import CollegeHeader from './CollegeHeader';

const SuggestJobs = () => {
  const [jobs, setJobs] = useState([]);

  // Retrieve userId from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  useEffect(() => {
    AOS.init({ duration: 1000 }); // AOS animations
    const lightbox = GLightbox(); // Glightbox initialization

    const fetchJobs = async () => {
      if (!userId) return;
      try {
        const data = await userService.getSuggestedOpportunities(userId);
        console.log(data)
        setJobs(data.suggestedJobs || []);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      }
    };

    fetchJobs();
  }, [userId]);

  return (
    <>
    <CollegeHeader />
    <div className="container mt-4">
      <h3 className="text-center mb-4" data-aos="fade-up">Suggested Jobs</h3>

      {jobs.length > 0 ? (
        <div className="row">
          {jobs.map((job, index) => (
            <div key={job._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow p-3" data-aos="zoom-in">
                <div className="card-body">
                  <h5 className="card-title fw-bold">{job.title}</h5>
                  <h6 className="card-subtitle text-muted">{job.company}</h6>
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> ${job.salary}</p>
                  <p><strong>Experience:</strong> {job.experience}</p>
                  <p><strong>Skills:</strong> {job.skills.join(", ")}</p>
                  <p><strong>Required Degree:</strong> {job.requiredDegree.join(", ")}</p>
            
                  <p><strong>Min Marks:</strong> {job.minMarks}%</p>
                  <p><strong>Min Age:</strong> {job.minAge}</p>

                  <a 
                href={`mailto:${job.mail}?subject=Admission Inquiry: ${job.title}`} 
                className="btn btn-primary mt-2"
              >
                Contact via Email
              </a>
              
                  {/* Glightbox content */}
                  <div id={`job-${index}`} className="glightbox-content" style={{ display: "none" }}>
                    <h3>{job.title} @ {job.company}</h3>
                    <p><strong>Description:</strong> {job.description}</p>
                    <p><strong>Location:</strong> {job.location}</p>
                    <p><strong>Salary:</strong> ${job.salary}</p>
                    <p><strong>Skills Required:</strong> {job.skills.join(", ")}</p>
                    <p><strong>Experience:</strong> {job.experience}</p>
                    <p><strong>Degree:</strong> {job.requiredDegree.join(", ")}</p>
                    <p><strong>Contact Email:</strong> {job.mail}</p>
                    <p><strong>Posted On:</strong> {new Date(job.postDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center" data-aos="fade-up">No job suggestions available.</p>
      )}
    </div>
    </>
  );
};

export default SuggestJobs;