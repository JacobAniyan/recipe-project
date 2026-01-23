function InlineError({ type, message }) {
  if (message) {
    return (
      <main role="alert">
        <h1>
          {type}: {message}
        </h1>
      </main>
    );
  } else if (type === "404") {
    return (
      <main role="alert">
        <h1>404: Page Not Found</h1>
      </main>
    );
  } else {
    return (
      <main role="alert">
        <h1>500: Server Error</h1>
      </main>
    );
  }
}

export default InlineError;
