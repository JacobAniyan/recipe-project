import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

function ErrorPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // If a component navigates here it can pass state: { status, message }
  const { status = 404, message = "Page Not Found" } = location.state || {};

  return (
    <div className="page-container">
      <Header />
      <div className="main-layout">
        <NavBar />
        <main className="error-content" role="alert" aria-live="polite">
          <div className="error-code">{status}</div>
          <h1 className="error-title">Error: {message}</h1>

          <div className="error-actions">
            <button onClick={() => navigate(-1)} className="btn">
              Go back
            </button>
            <button onClick={() => navigate("/")} className="btn">
              Home
            </button>
            <button onClick={() => window.location.reload()} className="btn">
              Retry
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ErrorPage;
