import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css"; // Import AOS CSS
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Header from "./Header";
import ROLES from "../constants/roles";
import authService from "../services/authService";
import degreeOptions from "../constants/degreeOptions";
import streamOptions from "../constants/streamOptions";

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS animation
  }, []);

  // Validation Schema using Yup
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    role: Yup.string()
      .oneOf(Object.values(ROLES), "Invalid role selection")
      .required("Role is required"),

    // Conditional validation based on role
    course: Yup.string().when("role", {
      is: ROLES.COLLEGE_STUDENT,
      then: (schema) => schema.required("Course is required"),
    }),
    degree: Yup.string().when("role", {
      is: ROLES.COLLEGE_STUDENT,
      then: (schema) => schema.required("Degree is required"),
    }),
    marks: Yup.string().when("role", {
      is: ROLES.COLLEGE_STUDENT,
      then: (schema) => schema.required("Marks are required"),
    }),
    age: Yup.string().when("role", {
      is: ROLES.COLLEGE_STUDENT,
      then: (schema) => schema.required("Age is required"),
    }),
    plusTwoPercentage: Yup.string().when("role", {
      is: ROLES.PLUS_TWO_STUDENT,
      then: (schema) => schema.required("Plus Two Percentage is required"),
    }),
    plusTwoStream: Yup.string().when("role", {
      is: ROLES.PLUS_TWO_STUDENT,
      then: (schema) => schema.required("Stream selection is required"),
    }),
  });

  // Handle Registration Submission
  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      console.log(values);
      const response = await authService.register(values);
      console.log(response);
      toast.success("Registration successful! Redirecting to login..."); // ✅ Success Toast
      setTimeout(() => navigate("/login"), 2000); // Redirect to Login
    } catch (error) {
      setErrors({ general: error.message }); // Set error messages
      toast.error(error.message || "Registration failed!"); // ✅ Error Toast
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #667eea, #764ba2)",
        }}
      >
        <div
          className="register-container text-center p-4"
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            width: "350px",
          }}
        >
          <h2 className="mb-4" style={{ color: "#333" }}>
            Register
          </h2>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: "",
              course: "",
              degree: "",
              marks: "",
              age: "",
              plusTwoPercentage: "",
              plusTwoStream: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ values, setFieldValue, touched, errors, isSubmitting }) => (
              <Form>
                {errors.general && (
                  <p className="text-danger small">{errors.general}</p>
                )}

                {/* Username */}
                <div className="mb-3">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Username"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Email */}
                <div className="mb-3">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <Field
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Confirm Password */}
                <div className="mb-3">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Role Dropdown */}
                <div className="mb-3">
                  <Field
                    as="select"
                    name="role"
                    className="form-control"
                    onChange={(e) => {
                      setFieldValue("role", e.target.value);
                      setSelectedRole(e.target.value);
                    }}
                  >
                    <option value="">Select Role</option>
                    <option value={ROLES.PLUS_TWO_STUDENT}>
                      Plus Two Student
                    </option>
                    <option value={ROLES.COLLEGE_STUDENT}>
                      College Student
                    </option>
                  </Field>
                  <ErrorMessage
                    name="role"
                    component="div"
                    className="text-danger small"
                  />
                </div>

                {/* Conditional Fields Based on Role */}
                {values.role === ROLES.COLLEGE_STUDENT && (
                  <>
                    <div className="mb-3">
                      <Field as="select" name="degree" className="form-control">
                        <option value="">Select Degree</option>
                        {degreeOptions.map((degree) => (
                          <option key={degree.value} value={degree.value}>
                            {degree.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="degree"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <Field
                        type="course"
                        name="course"
                        placeholder="Course"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="course"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <Field
                        type="text"
                        name="marks"
                        placeholder="Marks"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="marks"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="mb-3">
                      <Field
                        type="text"
                        name="age"
                        placeholder="Age"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  </>
                )}

                {values.role === ROLES.PLUS_TWO_STUDENT && (
                  <>
                    <div className="mb-3">
                      <Field
                        as="select"
                        name="plusTwoStream"
                        className="form-control"
                      >
                        <option value="">Select Stream</option>
                        {streamOptions.map((course) => (
                          <option key={course.value} value={course.value}>
                            {course.label} 
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="plusTwoStream"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        type="text"
                        name="plusTwoPercentage"
                        placeholder="Plus Two Percentage"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="plusTwoPercentage"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  </>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-3">
            Already have an account?{" "}
            <a href="/login" style={{ color: "#667eea" }}>
              Login
            </a>
          </p>

          <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </div>
    </>
  );
};

export default Register;
