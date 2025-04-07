import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite correct format

class UserService {
    // Create a new user
    async create(userData) {
        try {
        const response = await axios.post(`${API_BASE_URL}/users`, userData);
        return response;
        } catch (error) {
        throw error.response?.data || { message: "Something went wrong!" };
        }
    }
    
    // Update an existing user by ID
    async update(userId, userData) {
        try {
        const response = await axios.put(
            `${API_BASE_URL}/users/${userId}`,
            userData
        );
        return response;
        } catch (error) {
        throw error.response?.data || { message: "Something went wrong!" };
        }
    }
    
    // Get all users
    async getAll() {
        try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response;
        } catch (error) {
        throw error.response?.data || { message: "Something went wrong!" };
        }
    }
    
    // Get user by ID
    async getById(userId) {
        try {
        const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
        return response;
        } catch (error) {
        throw error.response?.data || { message: "Something went wrong!" };
        }
    }
    
    // Delete user by ID
    async delete(userId) {
        try {
        const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
        return response;
        } catch (error) {
        throw error.response?.data || { message: "Something went wrong!" };
        }
    }

    async getSuggestedOpportunities (userId) {
        try {
          if (!userId) {
            throw new Error("User ID is required");
          }
      
          const response = await axios.get(`${API_BASE_URL}/users/${userId}/suggest-opportunities`);
      
          return response.data;
        } catch (error) {
          console.error("Error fetching suggested colleges:", error);
          throw error;
        }
      };

}
export default new UserService(); // Export as a singleton instance
