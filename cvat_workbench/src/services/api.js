import axios from "axios";

const apiClient = axios.create({
  // The base URL is now handled by the Vite proxy
  withCredentials: true, // Important for session management
});

// Helper function to get a cookie by name
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Add a request interceptor to include the CSRF token
apiClient.interceptors.request.use(
  (config) => {
    // Add CSRF token to headers for state-changing methods
    if (
      ["POST", "PUT", "PATCH", "DELETE"].includes(config.method.toUpperCase())
    ) {
      const csrftoken = getCookie("csrftoken");
      if (csrftoken) {
        config.headers["X-CSRFToken"] = csrftoken;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Logs in a user.
 * @param {string} email - The email for login.
 * @param {string} password - The password for login.
 * @returns {Promise} The axios promise.
 */
export const login = (email, password) => {
  return apiClient.post("/api/auth/login", { email, password });
};

/**
 * Logs out the current user.
 * @returns {Promise} The axios promise.
 */
export const logout = () => {
  const csrftoken = getCookie("csrftoken");
  console.log("Current CSRF token:", csrftoken);
  return apiClient.post("/api/auth/logout");
};

/**
 * Fetches jobs.
 * @returns {Promise} The axios promise.
 */
export const getJobs = () => {
  return apiClient.get("/api/jobs");
};

export default apiClient;
