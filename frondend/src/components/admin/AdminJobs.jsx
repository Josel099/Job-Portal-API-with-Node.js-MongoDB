import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import "aos/dist/aos.css";
import Aos from "aos";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jobService from "../../services/jobService";
import AdminHeader from "./AdminHeader";
import degreeOptions from "../../constants/degreeOptions";

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1000 });
    fetchJobs();
  }, []);

  // Fetch all jobs
  const fetchJobs = async () => {
    try {
      const response = await jobService.getAll();
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  // Open modal for adding or editing job
  const handleShowModal = (job = null) => {
    setEditingJob(job);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingJob(null);
    setShowModal(false);
  };

  // Handle delete job with confirmation
  const handleDelete = async (jobId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await jobService.delete(jobId);
          fetchJobs(); // Refresh list
          toast.success("Job deleted successfully!");
        } catch (error) {
          console.error("Error deleting job:", error);
          toast.error("Failed to delete job.");
        }
      }
    });
  };

  // Validation Schema
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    company: Yup.string().required("Company is required"),
    description: Yup.string().required("Description is required"),
    location: Yup.string().required("Location is required"),
    salary: Yup.number().required("Salary is required").positive(),
    skills: Yup.string().required("Skills are required"),
    experience: Yup.string().required("Experience is required"),
    requiredDegree: Yup.string().required("Degree is required"),
    minMarks: Yup.number()
      .required("Minimum marks are required")
      .min(0)
      .max(100),
    minAge: Yup.number().required("Minimum age is required").min(18),
    mail: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <>
      <AdminHeader />

      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          padding: "50px 0",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      >
        <div className="container mt-4">
          <h2 className="text-center text-white fw-bold mb-4">List of Jobs</h2>
          {/* Add Job Button */}
          <div className="text-end mb-3">
            <Button variant="success" onClick={() => handleShowModal()}>
              Add Job
            </Button>
          </div>

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
                      <strong>Contact Email:</strong> {job.mail}
                    </p>

                    {/* Edit & Delete Buttons */}
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        style={{ padding: "8px 20px", fontSize: "0.9rem" }}
                        onClick={() => handleShowModal(job)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        style={{ padding: "8px 20px", fontSize: "0.9rem" }}
                        onClick={() => handleDelete(job.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Job Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{editingJob ? "Edit Job" : "Add Job"}</Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{
                title: editingJob?.title || "",
                company: editingJob?.company || "",
                description: editingJob?.description || "",
                location: editingJob?.location || "",
                salary: editingJob?.salary || "",
                experience: editingJob?.experience || "",
                requiredDegree: editingJob?.requiredDegree || "",
                minMarks: editingJob?.minMarks || "",
                minAge: editingJob?.minAge || "",
                mail: editingJob?.mail || "",
                skills: editingJob?.skills ? editingJob.skills.join(", ") : "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                Swal.fire({
                  title: editingJob ? "Confirm Update?" : "Confirm Add?",
                  text: editingJob
                    ? "Are you sure you want to update this job?"
                    : "Are you sure you want to add this job?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#28a745",
                  cancelButtonColor: "#d33",
                  confirmButtonText: editingJob
                    ? "Yes, update it!"
                    : "Yes, add it!",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      const jobData = {
                        ...values,
                        skills: values.skills.split(",").map((s) => s.trim()),
                      };

                      if (editingJob) {
                        await jobService.update(editingJob._id, jobData);
                        toast.success("Job updated successfully!");
                      } else {
                        await jobService.create(jobData);
                        toast.success("Job added successfully!");
                      }

                      fetchJobs();
                      handleCloseModal();
                    } catch (error) {
                      console.error("Error saving job:", error);
                      toast.error("Failed to save job.");
                    } finally {
                      setSubmitting(false);
                    }
                  } else {
                    setSubmitting(false);
                  }
                });
              }}
            >
              {({ isSubmitting }) => (
                <FormikForm>
                  <Modal.Body>
                    <div className="mb-3">
                      <label>Title</label>
                      <Field name="title" className="form-control" />
                      <ErrorMessage
                        name="title"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Company</label>
                      <Field name="company" className="form-control" />
                      <ErrorMessage
                        name="company"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Description</label>
                      <Field
                        as="textarea"
                        name="description"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Location</label>
                      <Field name="location" className="form-control" />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Salary</label>
                      <Field
                        name="salary"
                        type="number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="salary"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Skills (comma separated)</label>
                      <Field name="skills" className="form-control" />
                      <ErrorMessage
                        name="skills"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Experience</label>
                      <Field name="experience" className="form-control" />
                      <ErrorMessage
                        name="experience"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <Field
                        as="select"
                        name="requiredDegree"
                        className="form-control"
                      >
                        <option value="">Select Degree</option>
                        {degreeOptions.map((degree) => (
                          <option key={degree.value} value={degree.value}>
                            {degree.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="requiredDegree"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Minimum Marks (%)</label>
                      <Field
                        name="minMarks"
                        type="number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="minMarks"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Minimum Age</label>
                      <Field
                        name="minAge"
                        type="number"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="minAge"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Contact Email</label>
                      <Field
                        name="mail"
                        type="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="mail"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                    >
                      {editingJob ? "Update Job" : "Add Job"}
                    </Button>
                  </Modal.Footer>
                </FormikForm>
              )}
            </Formik>
          </Modal>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default AdminJobs;
