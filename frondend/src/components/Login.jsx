import React, { useEffect, useState } from "react";
import Aos from "aos";
import Header from "./Header";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";``
import "react-toastify/dist/ReactToastify.css";
import authService from "../services/authService";

const Login = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await authService.login(values);
        const { user, message } = response.data; // ✅ Extract user & message

        console.log(response.data);
        // ✅ Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ Redirect based on role
        switch (user.role) {
          case "admin":
            window.location.href = "/adminDashboard";
            break;
          case "plustwoStudent":
            window.location.href = "/plustwoDashboard";
            break;
          case "collegeStudent":
            window.location.href = "/collegeDashboard";
            break;
          default:
            window.location.href = "/dashboard";
        }

        toast.success(message || "Login successful!");
      } catch (error) {
        toast.error(error.error || "Login failed!");
      }
      setLoading(false);
    },
  });

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
          className="login-container text-center p-4"
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            width: "350px",
          }}
        >
          <h2 className="mb-4" style={{ color: "#333" }}>
            Login
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <input
                type="text"
                name="email"
                placeholder="Email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div className="mb-3">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {formik.errors.password}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 py-2"
              style={{
                background: "#667eea",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="mt-3">
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#667eea" }}>
              Sign Up
            </a>
          </p>
        </div>
        {/* ✅ Toast Container for Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
};

export default Login;
