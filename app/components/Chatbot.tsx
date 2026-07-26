import { useState, useRef, useEffect } from "react";
import { useChatbot, useResetChat } from "~/hooks/useApi";
import toast from "react-hot-toast";
import { Bot, BotMessageSquare, CircleX, Send, Trash } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "../context/IntroContext";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}
import type { Chat_history_Array } from "~/types";
import ChatBotCard from "./ChatBot/ChatBotCard";

const MarkdownMessage = ({
  content,
  isUser,
}: {
  content: string;
  isUser: boolean;
}) => {
  if (isUser) {
    return <div className="whitespace-pre-wrap">{content}</div>;
  }

  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold mb-2 text-gray-900">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold mb-2 text-gray-900">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-medium mb-1 text-gray-900">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-2 last:mb-0 text-gray-900">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 text-gray-900">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 text-gray-900">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,

          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono text-gray-900">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-200 p-2 rounded text-xs font-mono overflow-x-auto text-gray-900">
                {children}
              </code>
            );
          },

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-3 italic text-gray-700 mb-2">
              {children}
            </blockquote>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-blue-800"
            >
              {children}
            </a>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">
              {children}
            </strong>
          ),

          table: ({ children }) => (
            <table className="border-collapse border border-gray-300 text-xs mb-2">
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 px-2 py-1 bg-gray-100 font-medium text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 px-2 py-1 text-gray-900">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Chat_history_Array>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = typeof window !== "undefined" ? window.location.href : "";
  const { mutate: sendMessage, isPending } = useChatbot();
  const { mutate: resetChat } = useResetChat();
  const { introReady } = useIntro();

  // Show welcome bubble exactly 2s after mount — independent of intro animation
  useEffect(() => {
    const showTimer = setTimeout(() => setShowWelcome(true), 2000);
    const hideTimer = setTimeout(() => setShowWelcome(false), 8000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleOpen = () => {
    setShowWelcome(false);
    setIsOpen(true);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: inputMessage.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage.trim();
    setInputMessage("");

    sendMessage(
      { user_message: currentMessage, chatHistory },
      {
        onSuccess: (response: any) => {
          const assistantMessage = response.find(
            (msg: any) => msg.role === "assistant",
          );
          const botResponseText = assistantMessage
            ? assistantMessage.content
            : "Sorry, I couldn't process your request.";
          const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            message: botResponseText,
            isUser: false,
            timestamp: new Date(),
          };

          setMessages((prev) => [...prev, botMessage]);

          setChatHistory((prev) => [
            ...prev,
            {
              role: "user",
              content: currentMessage,
              metadata: {},
              options: {},
            },
            {
              role: "assistant",
              content: botResponseText,
              metadata: {},
              options: {},
            },
          ]);
        },
        onError: (error) => {
          toast.error("Failed to send message");
          console.error("Chat error:", error);
        },
      },
    );
  };
  const handleResetChat = () => {
    resetChat();
    setMessages([]);
    setChatHistory([]);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div
        className={`fixed ${
          location.includes("/dashboard") ? "bottom-20 lg:bottom-4" : "bottom-4"
        } right-4 z-50 flex flex-col items-end gap-3`}
      >
        {/* Welcome bubble */}
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-[220px] bg-white text-[#0E2C5E] text-sm font-medium px-4 py-3 rounded-2xl rounded-br-sm shadow-lg border border-[#EFE7F6] cursor-pointer"
              onClick={handleOpen}
            >
              👋 Hi! I'm the IEEE AI Assistant. Got a question? I'm here to help!
              {/* Tail */}
              <span className="absolute -bottom-2 right-4 w-0 h-0 border-l-8 border-l-transparent border-r-0 border-t-8 border-t-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chatbot toggle button */}
        <button
          onClick={handleOpen}
          className="cursor-pointer w-17 h-17 rounded-full bg-[#4460EF] hover:bg-[#364dbe] flex justify-center items-center shadow-lg transition-colors duration-200"
          aria-label="Open AI Assistant"
        >
          <img className="w-10 h-10" src="/chatbot.png" alt="IEEE AI Assistant" />
        </button>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && <ChatBotCard setIsOpen={setIsOpen} />}
    </AnimatePresence>
  );
}
