import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";
import AOS from "aos";
import "aos/dist/aos.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import collegeService from "../../services/collegeService";
import AdminHeader from "./AdminHeader";
import courseOptions from "../../constants/courseOptions";
import streamOptions from "../../constants/streamOptions";

const AdminColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
    GLightbox({ selector: ".glightbox" }); // Initialize GLightbox
    fetchColleges();
  }, []);

  // Fetch Colleges
  const fetchColleges = async () => {
    try {
      const response = await collegeService.getAll();
      setColleges(response.data);
    } catch (error) {
      console.error("Error fetching colleges:", error);
    }
  };

  // Show modal
  const handleShowModal = (college = null) => {
    setEditingCollege(college);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setEditingCollege(null);
    setShowModal(false);
  };

  // Delete College with SweetAlert Confirmation
  const handleDelete = async (collegeId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This college will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await collegeService.delete(collegeId);
          fetchColleges();
          toast.success("College deleted successfully!");
        } catch (error) {
          console.error("Error deleting college:", error);
          toast.error("Failed to delete college.");
        }
      }
    });
  };

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().required("College name is required"),
    location: Yup.string().required("Location is required"),
    minMarks: Yup.number().required("Minimum marks is required"),
    courses: Yup.array().min(1, "At least one course is required"),
    mail: Yup.string().required("Email is required"),
    requiredStream: Yup.array().min(1, "At least one course is required"),
  });

  return (
    <>
      <AdminHeader />
      <div
        style={{
          width: "100vw",
          minHeight: "100vh",
          padding: "40px 0",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      >
        <div className="container mt-4">
          <h2 className="text-center text-white fw-bold mb-4">
            List of Colleges
          </h2>

          {/* Add College Button */}
          <div className="text-end mb-3">
            <Button variant="success" onClick={() => handleShowModal()}>
              Add College
            </Button>
          </div>

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

                    {/* Edit & Delete Buttons */}
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => handleShowModal(college)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(college.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit College Modal */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {editingCollege ? "Edit College" : "Add College"}
              </Modal.Title>
            </Modal.Header>
            <Formik
              initialValues={{
                name: editingCollege?.name || "",
                location: editingCollege?.location || "",
                minMarks: editingCollege?.minMarks || "",
                courses: editingCollege?.courses || [],
                mail: editingCollege?.mail || [],
                requiredStream: editingCollege?.requiredStream || [],
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                // Show SweetAlert confirmation
                const result = await Swal.fire({
                  title: editingCollege ? "Update College?" : "Add College?",
                  text: editingCollege
                    ? "Are you sure you want to update this college?"
                    : "Are you sure you want to add this college?",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonText: editingCollege
                    ? "Yes, Update"
                    : "Yes, Add",
                  cancelButtonText: "Cancel",
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                });

                if (result.isConfirmed) {
                  try {
                    if (editingCollege) {
                      await collegeService.update(editingCollege._id, values);
                      toast.success("College updated successfully!");
                    } else {
                      await collegeService.create(values);
                      toast.success("College added successfully!");
                    }

                    fetchColleges();
                    handleCloseModal();
                  } catch (error) {
                    console.error("Error saving college:", error);
                    toast.error("Failed to save college.");
                  }
                }

                setSubmitting(false);
              }}
            >
              {({ isSubmitting, setFieldValue, values }) => (
                <FormikForm>
                  <Modal.Body>
                    <div className="mb-3">
                      <label>College Name</label>
                      <Field name="name" className="form-control" />
                      <ErrorMessage
                        name="name"
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
                      <label>Minimum Marks</label>
                      <Field name="minMarks" className="form-control" />
                      <ErrorMessage
                        name="minMarks"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Email</label>
                      <Field name="mail" className="form-control" />
                      <ErrorMessage
                        name="mail"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="mb-3">
                      <label>Courses Offered</label>
                      <Select
                        options={courseOptions}
                        isMulti
                        value={courseOptions.filter((option) =>
                          values.courses.includes(option.value)
                        )}
                        onChange={(selected) =>
                          setFieldValue(
                            "courses",
                            selected.map((item) => item.value)
                          )
                        }
                      />
                      
                      <ErrorMessage
                        name="courses"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="mb-3">
                      <label>Required Stream</label>
                      <Select
                        options={streamOptions}
                        isMulti
                        value={streamOptions.filter((option) =>
                          values.requiredStream.includes(option.value)
                        )}
                        onChange={(selected) =>
                          setFieldValue(
                            "requiredStream",
                            selected.map((item) => item.value)
                          )
                        }
                      />
                      <ErrorMessage
                        name="requiredStream"
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
                      {editingCollege ? "Update College" : "Add College"}
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

export default AdminColleges;
