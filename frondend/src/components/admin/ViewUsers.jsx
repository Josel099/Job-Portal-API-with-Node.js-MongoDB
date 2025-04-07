import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "../../services/userService";
import ROLES from "../../constants/roles";
import AOS from "aos";
import GLightbox from "glightbox";
import courseOptions from "../../constants/courseOptions";
import degreeOptions from "../../constants/degreeOptions";
import streamOptions from "../../constants/streamOptions";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
    GLightbox({ selector: ".glightbox" }); // Initialize GLightbox
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const response = await userService.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleShowModal = (user = null) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await userService.delete(id);
          toast.success("User deleted successfully!");
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          toast.error("Failed to delete user.");
        }
      }
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
  });

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center fw-bold mb-4">User Management</h2>
        <div className="text-end mb-3">
          <Button variant="success" onClick={() => handleShowModal()}>
            Add User
          </Button>
        </div>
        <div className="row">
  {users.filter(user => user.role !== "admin").map((user, index) => (
    <div key={user.id} className="col-md-6 col-lg-4 mb-4">
      <div className="card shadow-lg p-3">
        <div className="card-body">
          <h5 className="card-title fw-bold">{user.name}</h5>
          <h6 className="card-subtitle text-muted">{user.email}</h6>
          <p className="text-muted"><strong>Role:</strong> {user.role}</p>
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={() => handleShowModal(user)}>
              Edit
            </Button>
            <Button variant="danger" onClick={() => handleDelete(user._id)}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* Add/Edit User Modal */}
        {/* Add/Edit User Modal */}
<Modal show={showModal} onHide={handleCloseModal}>
  <Modal.Header closeButton>
    <Modal.Title>{editingUser ? "Edit User" : "Add User"}</Modal.Title>
  </Modal.Header>
  <Formik
    initialValues={{
      name: editingUser?.name || "",
      email: editingUser?.email || "",
      role: editingUser?.role || "",
      course: editingUser?.course || "",
      degree: editingUser?.degree || "",
      marks: editingUser?.marks || "",
      age: editingUser?.age || "",
      plusTwoStream: editingUser?.plusTwoStream || "",
      plusTwoPercentage: editingUser?.plusTwoPercentage || "",
    }}
    validationSchema={validationSchema}
    onSubmit={async (values, { setSubmitting }) => {
      Swal.fire({
        title: editingUser ? "Confirm Update?" : "Confirm Add?",
        text: editingUser ? "Update this user?" : "Add this user?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#d33",
        confirmButtonText: editingUser ? "Yes, update it!" : "Yes, add it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            if (editingUser) {
              await userService.update(editingUser._id, values);
              toast.success("User updated successfully!");
            } else {
              await userService.create(values);
              toast.success("User added successfully!");
            }
            fetchUsers();
            handleCloseModal();
          } catch (error) {
            console.error("Error saving user:", error);
            toast.error("Failed to save user.");
          } finally {
            setSubmitting(false);
          }
        } else {
          setSubmitting(false);
        }
      });
    }}
  >
    {({ values, isSubmitting, setFieldValue }) => (
      <FormikForm>
        <Modal.Body>
          <div className="mb-3">
            <label>Name</label>
            <Field name="name" className="form-control" />
            <ErrorMessage name="name" component="div" className="text-danger" />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <Field name="email" type="email" className="form-control" />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          {/* Role Dropdown */}
          <div className="mb-3">
            <label>Role</label>
            <Field
              as="select"
              name="role"
              className="form-control"
              onChange={(e) => {
                setFieldValue("role", e.target.value);
              }}
            >
              <option value="">Select Role</option>
              <option value={ROLES.PLUS_TWO_STUDENT}>Plus Two Student</option>
              <option value={ROLES.COLLEGE_STUDENT}>College Student</option>
            </Field>
            <ErrorMessage name="role" component="div" className="text-danger" />
          </div>

          {/* Conditional Fields Based on Role */}
          {values.role === ROLES.COLLEGE_STUDENT && (
            <>
              <div className="mb-3">
                <label>Course</label>
                <Field as="select" name="course" className="form-control">
  <option value="">Select Course</option>
  {courseOptions.map((course) => (
    <option key={course.value} value={course.value}>
      {course.label}
    </option>
  ))}
</Field>
<ErrorMessage name="course" component="div" className="text-danger small" />
                <ErrorMessage name="course" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>Degree</label>
                <Field as="select" name="degree" className="form-control">
  <option value="">Select Degree</option>
  {degreeOptions.map((degree) => (
    <option key={degree.value} value={degree.value}>
      {degree.label}
    </option>
  ))}
</Field>
<ErrorMessage name="degree" component="div" className="text-danger small" />
                <ErrorMessage name="degree" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>Marks</label>
                <Field type="text" name="marks" placeholder="Marks" className="form-control" />
                <ErrorMessage name="marks" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>Age</label>
                <Field type="text" name="age" placeholder="Age" className="form-control" />
                <ErrorMessage name="age" component="div" className="text-danger" />
              </div>
            </>
          )}

          {values.role === ROLES.PLUS_TWO_STUDENT && (
            <>
              <div className="mb-3">
                <label>Stream</label>
                <Field as="select" name="plusTwoStream" className="form-control">
  <option value="">Select Stream</option>
  {streamOptions.map((course) => (
    <option key={course.value} value={course.value}>
      {course.label}
    </option>
  ))}
</Field>
                <ErrorMessage name="plusTwoStream" component="div" className="text-danger" />
              </div>

              <div className="mb-3">
                <label>Plus Two Percentage</label>
                <Field type="text" name="plusTwoPercentage" placeholder="Percentage" className="form-control" />
                <ErrorMessage name="plusTwoPercentage" component="div" className="text-danger" />
              </div>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {editingUser ? "Update User" : "Add User"}
          </Button>
        </Modal.Footer>
      </FormikForm>
    )}
  </Formik>
</Modal>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default ViewUsers;
