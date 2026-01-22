import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

function ErrorPage() {
  return (
    <div className="page-container">
      <Header />
      <div className="main-layout">
        <Navigation />
        <main className="error-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Error: Page Not Found</h1>
        </main>
      </div>
    </div>
  );
}

export default ErrorPage;
