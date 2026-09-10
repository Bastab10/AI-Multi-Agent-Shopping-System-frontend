import { useEffect, useRef, useState } from "react";
import { Send, Loader2, LockKeyhole } from "lucide-react";
import { sendChatMessage } from "../services/chatApi";
import { useAuth } from "../context/AuthContext";

export default function Chatbot({
  onProductsFound,
  onRecommendationFound,
  onComparisonFound,
}) {
  const { isAuthenticated } = useAuth();

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm ShopIntel AI. Tell me what you're looking for, and I'll help you find the right product.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");

  const chatContainerRef = useRef(null);
  const messageTimeoutRef = useRef(null);

  useEffect(() => {
    const container = chatContainerRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, loading, loginMessage]);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setMessages([
        {
          role: "assistant",
          content:
            "Hi! I'm ShopIntel AI. Tell me what you're looking for, and I'll help you find the right product.",
        },
      ]);

      setInput("");
      setLoading(false);
      setLoginMessage("");
    }
  }, [isAuthenticated]);

  const handleSend = async () => {
    const text = input.trim();

    if (!text || loading) return;

    if (!isAuthenticated) {
      setLoginMessage("Please login to use the AI Shopping Assistant.");

      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }

      messageTimeoutRef.current = setTimeout(() => {
        setLoginMessage("");
      }, 3500);

      return;
    }

    const userMessage = {
      role: "user",
      content: text,
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoginMessage("");
    setLoading(true);

    try {
      const response = await sendChatMessage(updatedMessages);

      if (response?.products?.length > 0) {
        onProductsFound?.(response.products);
      }

      if (response?.recommendation) {
        onRecommendationFound?.(response.recommendation);
      }

      if (response?.comparison) {
        onComparisonFound?.(response.comparison);
      }

      const assistantMessage = {
        role: "assistant",
        content:
          response?.reply ||
          "Sorry, I couldn't understand that. Please try again.",
        requirements: response?.requirements || null,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="w-full max-w-[550px]">
      <div
        className="
          overflow-hidden
          rounded-[28px]
          border border-white/70
          bg-gradient-to-br
          from-white/45
          via-purple-50/30
          to-pink-50/35
          backdrop-blur-xl
        "
      >
        <div
          className="
            flex items-center gap-3
            border-b border-white/60
            bg-white/20
            px-5 py-4
          "
        >
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              AI Shopping Assistant
            </h2>

            <div className="mt-0.5 flex items-center gap-2 text-xs font-extralight text-gray-500">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Online
            </div>
          </div>
        </div>

        <div
          ref={chatContainerRef}
          className="
            h-[190px]
            overflow-y-auto
            px-4 py-4
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-violet-200
          "
        >
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-end gap-2.5 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[78%] rounded-[18px] px-4 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "rounded-br-md bg-violet-400/90 text-white"
                      : "rounded-bl-md border border-white/65 bg-white/35 text-gray-800"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loginMessage && (
              <div className="flex justify-center px-2">
                <div
                  className="
                    flex items-center gap-2
                    rounded-xl
                    border border-red-100/70
                    bg-red-50/65
                    px-4 py-2.5
                    text-center
                    text-xs font-medium
                    text-red-500
                    animate-in fade-in
                  "
                >
                  <LockKeyhole size={14} strokeWidth={2} />
                  <span>{loginMessage}</span>
                </div>
              </div>
            )}

            {loading && (
              <div className="flex items-end gap-2.5">
                <div
                  className="
                    flex items-center gap-2
                    rounded-[18px]
                    rounded-bl-md
                    border border-white/65
                    bg-white/35
                    px-4 py-3
                    text-sm text-gray-500
                  "
                >
                  <Loader2 size={15} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            )}
          </div>
        </div>

        <div
          className="
            border-t border-white/60
            bg-white/20
            p-4
          "
        >
          <div
            className="
              flex items-center gap-2
              rounded-2xl
              border border-violet-500/60
              bg-white/35
              px-2 py-2
              transition
              focus-within:border-violet-300/70
              focus-within:bg-white/45
            "
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              rows={1}
              className="
                min-h-11 max-h-24
                flex-1 resize-none
                bg-transparent
                px-3 py-2.5
                text-sm text-black-600
                outline-none
                placeholder:text-gray-700
              "
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-violet-900
                text-white
                transition
                hover:bg-violet-500/90
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>

          <p className="mt-2 text-center text-[11px] font-extralight text-gray-400">
            AI-powered shopping • Discover • Compare • Choose
          </p>
        </div>
      </div>
    </section>
  );
}