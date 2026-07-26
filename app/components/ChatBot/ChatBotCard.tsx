import {
  Info,
  NotepadText,
  OctagonX,
  SendHorizontal,
  UserRoundPlus,
  Users,
  RotateCcw,
} from "lucide-react";
import NewChatBox from "./NewChatBox";
import ChatMessage from "./ChatMessage";
import { useState, useRef, useEffect, type KeyboardEvent } from "react";
import type { IAiBox, Chat_history_Array } from "~/types";
import { useChatbot, useResetChat } from "~/hooks/useApi";
import { motion } from "framer-motion";

const boxes: IAiBox[] = [
  {
    id: 1,
    text: "Upcoming Events & Activities",
    icon: <NotepadText color="#3348B3" size={20} />,
  },
  {
    id: 2,
    text: "About IEEE Beni Suef",
    icon: <Info color="#3348B3" size={20} />,
  },
  {
    id: 3,
    text: "Meet our Committees",
    icon: <Users color="#3348B3" size={20} />,
  },
  {
    id: 4,
    text: "How to Join IEEE BNS",
    icon: <UserRoundPlus color="#3348B3" size={20} />,
  },
];

interface IProps {
  setIsOpen: (val: boolean) => void;
}

interface MessageItem {
  id: string;
  text: string;
  sender: "me" | "bot";
}

const ChatBotCard = ({ setIsOpen }: IProps) => {
  const [showQuickBoxes, setShowQuickBoxes] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [chatHistory, setChatHistory] = useState<Chat_history_Array>([]);
  const [messagesList, setMessagesList] = useState<MessageItem[]>([
    {
      id: "initial-welcome",
      text: "Hi! I'm the IEEE AI Assistant. How can I help you today?",
      sender: "bot",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { mutate: sendMessage, isPending } = useChatbot();
  const { mutate: resetChat } = useResetChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList, isPending]);

  const handleReset = () => {
    resetChat();
    setMessagesList([
      {
        id: "initial-welcome-" + Date.now(),
        text: "Hi! I'm the IEEE AI Assistant. How can I help you today?",
        sender: "bot",
      },
    ]);
    setChatHistory([]);
    setShowQuickBoxes(true);
    setInputValue("");
  };

  const handleSendMessage = (customMessage?: string) => {
    const textToSend = customMessage || inputValue.trim();
    if (!textToSend || isPending) return;

    // Add User Message
    const userMsg: MessageItem = {
      id: Date.now().toString(),
      text: textToSend,
      sender: "me",
    };

    setMessagesList((prev) => [...prev, userMsg]);
    if (!customMessage) setInputValue("");
    setShowQuickBoxes(false);

    // Call Chatbot API Mutation
    sendMessage(
      { user_message: textToSend, chatHistory },
      {
        onSuccess: (response: any) => {
          let botResponseText = "";
          if (Array.isArray(response)) {
            const assistantMsg = response.find((msg: any) => msg.role === "assistant");
            botResponseText = assistantMsg ? assistantMsg.content : "Thanks for asking! IEEE Beni Suef Student Branch empowers students through workshops, hackathons, and community engineering projects.";
          } else if (typeof response === "string") {
            botResponseText = response;
          } else if (response?.reply || response?.message) {
            botResponseText = response.reply || response.message;
          } else {
            botResponseText = "Thanks for asking! IEEE Beni Suef Student Branch empowers students through workshops, hackathons, and community engineering projects.";
          }

          const botMsg: MessageItem = {
            id: (Date.now() + 1).toString(),
            text: botResponseText,
            sender: "bot",
          };

          setMessagesList((prev) => [...prev, botMsg]);
          setChatHistory((prev) => [
            ...prev,
            { role: "user", content: textToSend, metadata: {}, options: {} },
            { role: "assistant", content: botResponseText, metadata: {}, options: {} },
          ]);
        },
        onError: () => {
          // Provide intelligent contextual fallback answers if API endpoint is offline
          let fallbackText = "IEEE Beni Suef Student Branch is dedicated to empowering student engineers with technical bootcamps, workshops, and global networking!";
          const lower = textToSend.toLowerCase();

          if (lower.includes("event")) {
            fallbackText = "Explore our upcoming flagship events: IEEE Tech Summit 2026, AI & Embedded Robotics Hackathon, and Web Engineering Bootcamps!";
          } else if (lower.includes("committee")) {
            fallbackText = "We have Technical Committees (Backend, Frontend, AI, Astronomy, Embedded Systems) and Operational Committees (HR, PR, Logistics, Media)!";
          } else if (lower.includes("join")) {
            fallbackText = "Joining IEEE BNS is easy! Click the 'Sign Up' button in the navigation header or visit our registration page to get started.";
          }

          const botMsg: MessageItem = {
            id: (Date.now() + 1).toString(),
            text: fallbackText,
            sender: "bot",
          };

          setMessagesList((prev) => [...prev, botMsg]);
        },
      }
    );
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isButtonDisabled = !inputValue.trim() || isPending;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 20 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="h-[560px] w-[380px] max-w-[calc(100vw-2rem)] mx-auto flex flex-col justify-between p-3 fixed bottom-4 right-4 sm:right-6 z-[100] bg-white rounded-3xl shadow-2xl border border-purple-100 font-sans"
    >
      {/* ============= Header =================== */}
      <div className="w-full h-[64px] bg-[#4460EF] flex justify-between items-center px-4 rounded-2xl shrink-0 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-white/20 p-1 flex justify-center items-center shrink-0">
            <img className="w-full h-full object-contain" src="/chatbot.png" alt="IEEE AI Assistant" />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-bold text-base text-white leading-tight">
              IEEE AI Assistant
            </h3>
            <div className="flex items-center space-x-1.5 font-medium text-[11px] text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <button
            className="cursor-pointer p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={handleReset}
            title="Reset Conversation"
            aria-label="Reset Conversation"
          >
            <RotateCcw size={19} />
          </button>
          <button
            className="cursor-pointer p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Close Assistant"
          >
            <OctagonX size={22} />
          </button>
        </div>
      </div>

      {/* ============= Messages Container ============= */}
      <div className="w-full flex-1 my-3 bg-[#FEFEFF] p-3 rounded-2xl overflow-y-auto overflow-x-hidden border border-slate-100 flex flex-col">
        {messagesList.map((msg) => (
          <ChatMessage key={msg.id} sender={msg.sender} text={msg.text} />
        ))}

        {isPending && (
          <div className="flex items-center gap-2 my-2 text-slate-400 text-xs italic">
            <div className="w-2 h-2 bg-[#4460EF] rounded-full animate-ping" />
            IEEE Assistant is typing...
          </div>
        )}

        {showQuickBoxes && (
          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
            <p className="text-xs font-semibold text-slate-400 px-1">Suggested Prompts:</p>
            {boxes.map((box) => (
              <NewChatBox
                key={box.id}
                icon={box.icon}
                text={box.text}
                onClick={() => handleSendMessage(box.text)}
              />
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ============= Send Message Bar =================== */}
      <div className="flex items-center justify-between w-full h-[52px] bg-[#F4F6FC] rounded-2xl p-1.5 border border-slate-200 focus-within:border-[#4460EF] transition-colors shrink-0">
        <input
          type="text"
          placeholder="Ask Me Anything..."
          className="h-full flex-1 bg-transparent text-[#1E1E2F] text-sm px-3 focus:outline-none placeholder:text-slate-400 font-medium"
          name="question"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isPending}
        />
        <button
          type="button"
          className="h-10 w-10 bg-[#4460EF] hover:bg-[#364dbe] disabled:bg-slate-300 rounded-xl flex justify-center items-center cursor-pointer transition-colors shadow-sm shrink-0"
          onClick={() => handleSendMessage()}
          disabled={isButtonDisabled}
          aria-label="Send Message"
        >
          <SendHorizontal color="white" size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default ChatBotCard;
