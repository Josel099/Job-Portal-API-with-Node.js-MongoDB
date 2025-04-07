import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite correct format

class AuthService {
  async login(credentials) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

  async register(userData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response;
    } catch (error) {
      throw error.response?.data || { message: "Something went wrong!" };
    }
  }

}

export default new AuthService(); // Export as a singleton instance
