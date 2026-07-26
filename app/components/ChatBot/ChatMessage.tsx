import "./ChatMessage.css";

interface IProps {
  text: string;
  sender: "me" | "bot";
}

const ChatMessage = ({ sender, text }: IProps) => {
  const isBot = sender === "bot";

  return (
    <div
      className={`w-full flex items-end gap-2 my-3 ${
        isBot ? "justify-start" : "justify-end"
      }`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-[#4460EF] flex justify-center items-center shrink-0 overflow-hidden shadow-sm">
          <img className="w-6 h-6 object-contain" src="/chatbot.png" alt="Bot Avatar" />
        </div>
      )}

      <div
        className={`max-w-[78%] p-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
          isBot
            ? "bg-[#F1F4FE] text-[#1E1E2F] rounded-bl-none border border-[#E2E8F0]"
            : "bg-[#4460EF] text-white rounded-br-none"
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{text}</p>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-[#5A10A5] text-white font-bold text-xs flex justify-center items-center shrink-0 shadow-sm">
          You
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
