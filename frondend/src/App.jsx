import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/Index";
import About from "./components/About";
import Colleges from "./components/Colleges";
import Jobs from "./components/Jobs";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/admin/Dashboard";
import PlusTwoDashboard from "./components/plustwo/PlusTwoDashboard";
import CollegeDashboard from "./components/college/CollegeDashboard";
import AdminJobs from "./components/admin/AdminJobs";
import AdminColleges from "./components/admin/AdminColleges";
import PlustwoAbout from "./components/plustwo/PlustwoAbout";
import PlusTwoColleges from "./components/plustwo/PlusTwoColleges";
import CollegeJobs from "./components/college/CollegeJobs";
import SuggestCollege from "./components/plustwo/SuggestCollege";
import SuggestJobs from "./components/college/SuggestJobs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Common */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin */}
          <Route path="/adminDashboard" element={<Dashboard />} />
          <Route path="/adminColleges" element={<AdminColleges />} />
          <Route path="/adminJobs" element={<AdminJobs />} />

          {/* Plus Two */}
          <Route path="/plustwoDashboard" element={<PlusTwoDashboard />} />
          <Route path="/plustwoAbout" element={<PlustwoAbout />} />
          <Route path="/plustwoColleges" element={<PlusTwoColleges />} />
          <Route path="/suggestColleges" element={<SuggestCollege />} />

          {/* College */}
          <Route path="/collegeDashboard" element={<CollegeDashboard />} />
          <Route path="/collegeJobs" element={<CollegeJobs />} />
          <Route path="/suggestJobs" element={<SuggestJobs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
