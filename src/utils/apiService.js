import axios from "axios";
import { BASE_URL } from "./constants";

// Axios instance for real backend calls
const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log("API Request:", {
      method: config.method,
      url: config.url,
      baseURL: config.baseURL,
      headers: config.headers,
      withCredentials: config.withCredentials,
    });
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Response error:", {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const apiService = {
  // Login
  async login(email, password) {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.login(email, password);
    // }

    try {
      console.log("Attempting login with:", {
        email,
        passwordLength: password.length,
      });
      const response = await apiClient.post("/login", { email, password });
      console.log("Login successful:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Login failed:", {
        status: error.response?.status,
        message: error.response?.data,
        email: email,
      });
      throw new Error(
        error.response?.data?.message || error.response?.data || "Login failed"
      );
    }
  },

  // Signup
  async signup(userData) {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.signup(userData);
    // }

    try {
      console.log("Attempting signup with:", {
        email: userData.emailId,
        firstName: userData.firstName,
        lastName: userData.lastName,
      });
      const response = await apiClient.post("/signup", userData);
      console.log("Signup successful:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Signup failed:", {
        status: error.response?.status,
        message: error.response?.data,
        userData: userData,
      });
      throw new Error(
        error.response?.data?.message || error.response?.data || "Signup failed"
      );
    }
  },

  // Profile
  async getProfile() {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.getProfile();
    // }

    try {
      console.log(
        "Attempting to fetch profile from:",
        `${BASE_URL}/profile/view`
      );
      const response = await apiClient.get("/profile/view");
      console.log("Profile fetch successful:", response.data);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Profile fetch error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url: error.config?.url,
      });

      // Handle authentication errors specifically
      if (error.response?.status === 400 || error.response?.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  },

  // Update Profile
  async updateProfile(profileData) {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.updateProfile(profileData);
    // }

    try {
      const response = await apiClient.patch("/profile/edit", profileData);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Profile update failed");
    }
  },

  // Logout
  async logout() {
    // if (USE_MOCK_BACKEND) {
    //   return { success: true };
    // }

    try {
      await apiClient.post("/logout");
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },

  // Feed
  async getFeed() {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.getFeed();
    // }

    try {
      const response = await apiClient.get("/user/feed");
      return { success: true, data: response.data.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch feed");
    }
  },

  // Connections
  async getConnections() {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.getConnections();
    // }

    try {
      const response = await apiClient.get("/user/connections");
      return { success: true, data: response.data.data };
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch connections"
      );
    }
  },

  // Send Connection Requests
  async sendConnectionRequest(status, userId) {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.sendConnectionRequest(status, userId);
    // }
    
    try {
      const response = await apiClient.post(`/request/send/${status}/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to send request');
    }
  },

  // Get Received Connection Requests
  async getReceivedRequests() {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.getReceivedRequests();
    // }
    
    try {
      const response = await apiClient.get('/user/requests/received');
      return { success: true, data: response.data.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch requests');
    }
  },

  // Review Connection Requests
  async reviewConnectionRequest(status, requestId) {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.reviewConnectionRequest(status, requestId);
    // }
    
    try {
      const response = await apiClient.post(`/request/review/${status}/${requestId}`);
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to review request');
    }
  },

  // Premium
  async verifyPremium() {
    // if (USE_MOCK_BACKEND) {
    //   return await mockBackendAPI.verifyPremium();
    // }
    
    try {
      const response = await apiClient.get('/premium/verify');
      return { success: true, data: response.data };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to verify premium');
    }
  }

};
