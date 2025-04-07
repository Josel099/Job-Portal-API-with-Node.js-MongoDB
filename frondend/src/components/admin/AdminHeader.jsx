import Aos from "aos";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";

const AdminHeader = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with animation duration
  }, []);
  return (
    <>

      <div style={{ width: "100vw" }}>
        
        {" "}
        {/* Ensures full-width */}
        <header
          className="header d-flex align-items-center sticky-top"
          style={{ width: "100%" }}
        >
          <div className="container-fluid position-relative d-flex align-items-center justify-content-between">
            <a
              href="/adminDashboard"
              className="logo d-flex align-items-center"
            >
              {/* <img src={logo} alt="Logo" style={{ height: "50px" }} />{" "} */}
              {/* Adjust size if needed */}
              <h1 className="sitename ms-2">Career Guidence</h1>
            </a>
            <nav className="navmenu">
              <ul className="d-flex list-unstyled mb-0">
                <li>
                  <a href="/adminDashboard" className="active">
                    Home
                  </a>
                </li>

                <li>
                  <a href="/adminColleges">Colleges</a>
                </li>
                <li>
                  <a href="/adminJobs">Jobs</a>
                </li>
                
              </ul>
            </nav>
            <a
              className="btn-getstarted btn btn-primary px-4 py-2"
              href="/"
            >
              Logout
            </a>
          </div>
        </header>
      </div>

    </>
  );
};

export default AdminHeader;
