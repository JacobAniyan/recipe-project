import { useState } from "react";
const AIRecipePage = () => {
  const [message, setMessage] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Hi! I'm your AI Recipe Assistant. I can help you discover new recipes, suggest ingredient substitutions, or customise recipes to your dietary needs. What would you like to cook today?",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: message.length + 1,
      type: "user",
      content: inputValue,
    };

    setMessage((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: message.length + 2,
        type: "assistant",
        content:
          "This is a demo interface. In the full version, I would analyse your request and provide personalised recipe suggestions, cooking tips, or help you modify recipes based on your available ingredients and dietary preferences.",
      };
      setMessage((prevMessages) => [...prevMessages, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };
  const suggestionChips = [
    "What can I make with chicken and rice?",
    "Suggest a vegetarian dinner",
    "How do I substitute eggs in baking?",
    "Quick 30-minute meals",
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
  };

  return (
    <div className="page-container ai-recipe-page">
      <div className="page-header">
        <h1>AI Recipe Assistant</h1>
        <p className="ai-description">
          Chat with our AI to discover recipes, get cooking tips, and customise
          meals to your preferences.
        </p>
        <span className="demo-badge">Demo Preview</span>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {message.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.type === "user" ? "user-message" : "assistant-message"}`}
            >
              <div className="message-avatar">
                {message.type === "user" ? "👤" : "🧞"}
              </div>
              <div className="message-content">
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="suggestion-chips">
          {suggestionChips.map((suggestion, index) => (
            <button
              key={index}
              className="suggestion-chip"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>

        <div className="chat-input-container">
          <textarea
            className="chat-input"
            placeholder="Ask me about recipes, ingredients, or cooking tips..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            rows={1}
          />
          <button
            className="send-button"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>

      <div className="ai-features-preview">
        <h2>Coming Soon Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🍳</span>
            <h3>Recipe Generation</h3>
            <p>Create custom recipes based on your available ingredients</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🔄</span>
            <h3>Ingredient Substitutions</h3>
            <p>Get smart alternatives when you're missing ingredients</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🥗</span>
            <h3>Dietary Adaptations</h3>
            <p>Modify any recipe for your dietary requirements</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💡</span>
            <h3>Cooking Tips</h3>
            <p>Get expert advice and techniques for better cooking</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecipePage;
