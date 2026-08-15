import { useState } from "react";
import { askAI } from "../services/api";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your movie assistant. Ask me about movies, genres or recommendations.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const reply = await askAI(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (error) {
      console.error("AI Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't connect to the AI right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 px-5 py-4 text-white shadow-lg hover:bg-blue-700"
      >
        🤖 AI
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
            <div>
              <h2 className="font-bold">🎬 Movie AI</h2>
              <p className="text-xs">Your movie assistant</p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-xl"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto bg-gray-100 p-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-3 py-2 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="rounded-lg bg-white px-3 py-2 text-gray-500">
                AI is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="flex border-t bg-white p-3"
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about a movie..."
              className="flex-1 rounded-l-lg border px-3 py-2 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="rounded-r-lg bg-blue-600 px-4 text-white hover:bg-blue-700 disabled:bg-gray-400"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;