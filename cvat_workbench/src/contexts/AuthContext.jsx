import { createContext, useContext, useEffect, useState } from "react";
import apiClient, {
  login as apiLogin,
  logout as apiLogout,
  getJobs,
} from "../services/api";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Create the AuthProvider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchInitialData = async () => {
    try {
      const userResponse = await apiClient.get("/api/users/self");
      setUser(userResponse.data);
      const jobsResponse = await getJobs();
      setJobs(jobsResponse.data.results || []);
    } catch {
      setUser(null);
      setJobs([]);
    }
  };

  // Check for existing session when the provider mounts
  useEffect(() => {
    fetchInitialData().finally(() => {
      setIsInitialized(true);
    });
  }, []);

  const login = async (email, password) => {
    // Attempt to login
    await apiLogin(email, password);
    // On success, fetch user and task data
    await fetchInitialData();
  };

  const logout = async () => {
    try {
      await apiLogout();
      setUser(null);
      setJobs([]);
    } catch (error) {
      console.error("Logout failed", error);
      setUser(null);
      setJobs([]);
    }
  };

  const value = {
    user,
    jobs,
    isLoggedIn: !!user,
    isInitialized,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Create a custom hook for easy consumption
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
