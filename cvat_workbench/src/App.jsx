import { useEffect, useState } from "react";
import "./index.css";

import CvatView from "./components/CvatView";
import Header from "./components/Header";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthContext";

const CVAT_BASE_URL = "http://localhost:8080";

function App() {
  const [cvatUrl, setCvatUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isInitialized, isLoggedIn, login, jobs } = useAuth();

  // Effect to set the initial job view after jobs are loaded
  useEffect(() => {
    if (isLoggedIn && jobs.length > 0 && !cvatUrl) {
      setCvatUrl(
        `${CVAT_BASE_URL}/tasks/${jobs.at(0).task_id}/jobs/${jobs.at(0).id}`
      );
    }
    // Reset cvatUrl if user logs out
    if (!isLoggedIn) {
      setCvatUrl("");
    }
  }, [isLoggedIn, jobs, cvatUrl]);

  const handleLogin = async (email, password) => {
    setErrorMessage("");
    try {
      await login(email, password);
      // The useEffect above will handle setting the initial URL
    } catch (error) {
      console.error("Login failed:", error);
      const errorMsg =
        error.response?.data?.detail ||
        "Login failed. Please check credentials.";
      setErrorMessage(errorMsg);
    }
  };

  const handleProjectClick = (url) => {
    if (isLoggedIn) {
      setCvatUrl(url);
    } else {
      setErrorMessage("Please log in to view a project.");
    }
  };

  if (!isInitialized) {
    return <div>Loading application...</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>
      <Sidebar
        jobs={jobs}
        onProjectClick={handleProjectClick}
        currentUrl={cvatUrl}
      />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: 1, position: "relative" }}>
          {isLoggedIn ? (
            <CvatView url={cvatUrl} />
          ) : (
            <Login onLogin={handleLogin} errorMessage={errorMessage} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
