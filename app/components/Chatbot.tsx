import { useState, useRef, useEffect } from "react";
import { useChatbot, useResetChat } from "~/hooks/useApi";
import { Button } from "./ui/Button";
import toast from "react-hot-toast";
import { Bot, BotMessageSquare, CircleX, Send, Trash } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}
import type { Chat_history_Array } from "~/types";

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
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold mb-2 text-gray-900 dark:text-white">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-medium mb-1 text-gray-900 dark:text-white">
              {children}
            </h3>
          ),

          p: ({ children }) => (
            <p className="mb-2 last:mb-0 text-gray-900 dark:text-white">
              {children}
            </p>
          ),

          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-2 text-gray-900 dark:text-white">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-2 text-gray-900 dark:text-white">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="mb-1">{children}</li>,

          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="bg-gray-200 dark:bg-gray-600 px-1 py-0.5 rounded text-xs font-mono text-gray-900 dark:text-white">
                  {children}
                </code>
              );
            }
            return (
              <code className="block bg-gray-200 dark:bg-gray-600 p-2 rounded text-xs font-mono overflow-x-auto text-gray-900 dark:text-white">
                {children}
              </code>
            );
          },

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 italic text-gray-700 dark:text-gray-300 mb-2">
              {children}
            </blockquote>
          ),

          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200"
            >
              {children}
            </a>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900 dark:text-white">
              {children}
            </strong>
          ),

          table: ({ children }) => (
            <table className="border-collapse border border-gray-300 dark:border-gray-600 text-xs mb-2">
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 bg-gray-100 dark:bg-gray-700 font-medium text-gray-900 dark:text-white">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-gray-900 dark:text-white">
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
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Chat_history_Array>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = typeof window !== "undefined" ? window.location.href : "";
  const { mutate: sendMessage, isPending } = useChatbot();
  const { mutate: resetChat } = useResetChat();

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
            (msg: any) => msg.role === "assistant"
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
      }
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
      <div className={`fixed ${location.includes("/dashboard") ? "bottom-20 lg:bottom-4" : "bottom-4"} right-4 z-50`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Bot />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed ${location.includes("/dashboard") ? "bottom-20 lg:bottom-4" : "bottom-4"} right-4 z-50 w-[calc(100vw-2rem)] md:w-80 h-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 flex flex-col`}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <h3 className="font-semibold text-gray-900 dark:text-white ml-2 flex items-center gap-2">
            <BotMessageSquare />
            IEEE AI Assistant
          </h3>
        </div>
        <div className="flex items-center space-x-1">
          {messages.length > 0 && (
            <Button
              onClick={handleResetChat}
              variant="ghost"
              size="sm"
              className="h-8 w-8 cursor-pointer p-0"
              title="Clear chat"
            >
              <Trash size={20} />
            </Button>
          )}
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="default"
            className="h-8 w-8 cursor-pointer p-0"
          >
            <span className="sr-only">Close</span>
            <CircleX size={20} />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Ask me anything about IEEE or the management system!
          </div>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] p-3 rounded-lg text-sm ${
                msg.isUser
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm"
              }`}
            >
              <MarkdownMessage content={msg.message} isUser={msg.isUser} />
            </div>
          </div>
        ))}
        {isPending && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg rounded-bl-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t flex  border-gray-200 dark:border-gray-700">
        <div className="flex flex-1 space-x-2">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 w-full resize-none border border-gray-300 dark:border-gray-600 rounded-sm px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={1}
            disabled={isPending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isPending}
            size="sm"
            className="px-3 h-full rounded-sm flex justify-center items-center py-2"
          >
            <Send size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}
