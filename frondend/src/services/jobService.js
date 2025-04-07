import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite correct format

class JobService {
  // Create a new job
  async create(jobData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/jobs`, jobData);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Update an existing job by ID
  async update(jobId, jobData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/jobs/${jobId}`,
        jobData
      );
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Get all jobs
  async getAll() {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs`);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Get job by ID
  async getById(jobId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/jobs/${jobId}`);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Delete job by ID
  async delete(jobId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/jobs/${jobId}`);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }
}

export default new JobService(); // Export as a singleton instance
