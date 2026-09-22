import { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! 👋 I’m BhoomiSense AI. Ask me anything about crops, soil, fertilizers, irrigation, or farming.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const userMessage = message.trim();

    if (!userMessage || loading) {
      return;
    }

    // Add user message to chat
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const API_BASE_URL =
          import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

        fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
        },
      ]);
    } catch (error) {
      console.error("Chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the AI service. Please make sure the BhoomiSense backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        style={styles.chatButton}
        aria-label="Open BhoomiSense AI chatbot"
      >
        {isOpen ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div style={styles.chatWindow}>
          {/* Header */}
          <div style={styles.header}>
            <div>
              <div style={styles.title}>BhoomiSense AI</div>
              <div style={styles.status}>
                <span style={styles.statusDot}></span>
                Agriculture Assistant
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={styles.closeButton}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div style={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  ...styles.messageRow,
                  justifyContent:
                    msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(msg.role === "user"
                      ? styles.userMessage
                      : styles.assistantMessage),
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div style={styles.messageRow}>
                <div
                  style={{
                    ...styles.messageBubble,
                    ...styles.assistantMessage,
                  }}
                >
                  Thinking... 🌱
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div style={styles.inputArea}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about crops, soil, fertilizer..."
              rows={1}
              disabled={loading}
              style={styles.input}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              style={{
                ...styles.sendButton,
                opacity: loading || !message.trim() ? 0.5 : 1,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  chatButton: {
    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    background: "#16a34a",
    color: "#ffffff",
    fontSize: "26px",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25)",
    zIndex: 9999,
  },

  chatWindow: {
    position: "fixed",
    right: "25px",
    bottom: "95px",
    width: "380px",
    height: "560px",
    background: "#ffffff",
    borderRadius: "18px",
    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.25)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 9998,
    border: "1px solid #e5e7eb",
  },

  header: {
    background: "#166534",
    color: "#ffffff",
    padding: "18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "18px",
    fontWeight: "700",
  },

  status: {
    marginTop: "4px",
    fontSize: "12px",
    opacity: 0.9,
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#86efac",
    display: "inline-block",
  },

  closeButton: {
    background: "transparent",
    border: "none",
    color: "#ffffff",
    fontSize: "20px",
    cursor: "pointer",
  },

  messages: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    background: "#f8fafc",
  },

  messageRow: {
    display: "flex",
    marginBottom: "12px",
  },

  messageBubble: {
    maxWidth: "80%",
    padding: "10px 13px",
    borderRadius: "14px",
    fontSize: "14px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
  },

  userMessage: {
    background: "#16a34a",
    color: "#ffffff",
    borderBottomRightRadius: "4px",
  },

  assistantMessage: {
    background: "#ffffff",
    color: "#1f2937",
    border: "1px solid #e5e7eb",
    borderBottomLeftRadius: "4px",
  },

  inputArea: {
    display: "flex",
    gap: "8px",
    padding: "12px",
    background: "#ffffff",
    borderTop: "1px solid #e5e7eb",
  },

  input: {
    flex: 1,
    resize: "none",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    padding: "10px 12px",
    fontSize: "14px",
    outline: "none",
    fontFamily: "inherit",
  },

  sendButton: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    border: "none",
    background: "#16a34a",
    color: "#ffffff",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default Chatbot;