import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite correct format

class CollegeService {
  // Create a new college
  async create(collegeData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/colleges`, collegeData);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Update an existing college by ID
  async update(collegeId, collegeData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/colleges/${collegeId}`,
        collegeData
      );
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Get all colleges
  async getAll() {
    try {
      const response = await axios.get(`${API_BASE_URL}/colleges`);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Get college by ID
  async getById(collegeId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/colleges/${collegeId}`);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  // Delete college by ID
  async delete(collegeId) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/colleges/${collegeId}`);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

}

export default new CollegeService(); // Export as a singleton instance
