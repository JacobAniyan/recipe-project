import { useLocation } from "react-router-dom";

function ErrorPage() {
  const location = useLocation();
  const { status, message } = location.state || { status: 404, message: null };

  const errorMessages = {
    400: "Bad Request",
    404: "Page Not Found",
    500: "Internal Server Error",
  };

  const errorMessage = message || errorMessages[status] || "An error occurred";

  return (
    <main className="error-content" role="alert">
      <h1 className="error-title">
        Error {status}: {errorMessage}
      </h1>
    </main>
  );
}

export default ErrorPage;
