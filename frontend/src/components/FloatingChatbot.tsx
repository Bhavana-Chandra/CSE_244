import React, { useState, useRef } from "react";
import axios from "axios";

const PRIMARY_MODEL = "deepset/roberta-base-squad2";
const BACKUP_MODEL = "distilbert-base-cased-distilled-squad";
const API_URL = "https://api-inference.huggingface.co/models/";
const API_KEY = import.meta.env.VITE_HF_API_KEY;

const constitutionalContext = `You are an expert on the Constitution of India. Answer questions strictly based on the Constitution, providing relevant articles, sections, and context. If the question is not related to the Constitution, politely refuse.`;

function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! Ask me anything about the Constitution of India." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  async function queryModel(model, question) {
    try {
      const response = await axios.post(
        `${API_URL}${model}`,
        {
          inputs: {
            question: question,
            context: constitutionalContext
          }
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );
      if (response.data.answer) return response.data.answer;
      if (response.data.error) throw new Error(response.data.error);
      return "No answer found.";
    } catch (err) {
      throw err;
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setLoading(true);
    setError("");
    try {
      let answer = await queryModel(PRIMARY_MODEL, input);
      setMessages(msgs => [...msgs, { role: "bot", content: answer }]);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Try backup model
        try {
          let answer = await queryModel(BACKUP_MODEL, input);
          setMessages(msgs => [...msgs, { role: "bot", content: answer }]);
        } catch (err2) {
          setMessages(msgs => [...msgs, { role: "bot", content: "Sorry, I couldn't find an answer right now." }]);
          setError("Both models returned 404 errors. Please check your API key and model availability.");
        }
      } else {
        setMessages(msgs => [...msgs, { role: "bot", content: "Sorry, something went wrong." }]);
        setError("Error: " + (err.message || "Unknown error"));
      }
    }
    setInput("");
    setLoading(false);
  }

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
        onClick={() => setOpen(o => !o)}
        aria-label="Ask Constitution"
      >
        {open ? "Close Chat" : "Ask Constitution"}
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 w-80 max-w-full bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200 animate-fade-in">
          <div className="p-4 border-b font-bold text-blue-700">Constitutional Chatbot</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2" style={{ maxHeight: "300px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`text-sm ${msg.role === "bot" ? "text-gray-800 bg-blue-50 p-2 rounded-lg" : "text-right text-blue-700"}`}>{msg.content}</div>
            ))}
            {loading && <div className="text-xs text-gray-400">Bot is typing...</div>}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-2 border-t flex">
            <input
              className="flex-1 border rounded-l px-2 py-1 focus:outline-none"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Type your question..."
              disabled={loading}
            />
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded-r hover:bg-blue-700"
              onClick={sendMessage}
              disabled={loading}
            >Send</button>
          </div>
          {error && <div className="p-2 text-xs text-red-500">{error}</div>}
        </div>
      )}
    </div>
  );
}

export default FloatingChatbot;