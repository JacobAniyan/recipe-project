import Header from "../components/Header";
import NavBar from "../components/NavBar";

function ErrorPage() {
  return (
    <div className="page-container">
      <Header />
      <div className="main-layout">
        <NavBar />
        <main className="error-content">
          <div className="error-code">404</div>
          <h1 className="error-title">Error: Page Not Found</h1>
        </main>
      </div>
    </div>
  );
}

export default ErrorPage;
