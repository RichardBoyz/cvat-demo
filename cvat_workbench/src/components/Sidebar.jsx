function Sidebar({ jobs, onProjectClick, currentUrl }) {
  const CVAT_BASE_URL = "http://localhost:8080";

  return (
    <aside
      style={{
        width: "250px",
        borderRight: "1px solid #ccc",
        padding: "1rem",
        background: "#f4f4f4",
        height: "100vh",
      }}
    >
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Job List</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {jobs.length > 0 ? (
          jobs.map((job) => {
            const isSelected =
              currentUrl ===
              `${CVAT_BASE_URL}/tasks/${job.task_id}/jobs/${job.id}`;
            return (
              <li
                key={job.id}
                onClick={() =>
                  onProjectClick(
                    `${CVAT_BASE_URL}/tasks/${job.task_id}/jobs/${job.id}`
                  )
                }
                style={{
                  padding: "0.75rem",
                  cursor: "pointer",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                  backgroundColor: isSelected ? "#007bff" : "transparent",
                  color: isSelected ? "white" : "black",
                }}
              >
                {job.id}
              </li>
            );
          })
        ) : (
          <p>No jobs found.</p>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
