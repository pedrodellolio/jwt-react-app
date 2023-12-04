import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const MAX_CONTENT_WIDTH = 1200;

function Root() {
  const { signOut } = useAuth();
  return (
    <>
      <nav
        style={{
          backgroundColor: "#1a1a1a",
          marginBottom: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            maxWidth: MAX_CONTENT_WIDTH,
            margin: "0 auto",
          }}
        >
          <p>JWT Auth</p>
          <button onClick={signOut} style={{ backgroundColor: "#242424" }}>
            Sign Out
          </button>
        </div>
      </nav>
      <div style={{ maxWidth: MAX_CONTENT_WIDTH, margin: "0 auto" }}>
        <Outlet />
      </div>
    </>
  );
}

export default Root;
