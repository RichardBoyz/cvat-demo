import { useAuth } from "../contexts/AuthContext";

function Header() {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header
      style={{
        padding: "1rem",
        borderBottom: "1px solid #ccc",
        background: "#f9f9f9",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <strong>Status:</strong>
        {isLoggedIn ? (
          <span style={{ color: "green", marginLeft: "8px" }}>
            Logged In (as {user.email})
          </span>
        ) : (
          <span style={{ color: "red", marginLeft: "8px" }}>Not Logged In</span>
        )}
      </div>
      {isLoggedIn && (
        <button
          onClick={logout}
          disabled={!isLoggedIn}
          className="py-2 px-4 cursor-pointer"
        >
          Logout
        </button>
      )}
    </header>
  );
}

export default Header;
