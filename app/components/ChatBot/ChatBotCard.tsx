import {
  Info,
  NotepadText,
  OctagonX,
  SendHorizontal,
  UserRoundPlus,
  Users,
} from "lucide-react";
import NewChatBox from "./NewChatBox";

import ChatMessage from "./ChatMessage";
import { useState } from "react";
import type { IAiBox } from "~/types";

const boxes: IAiBox[] = [
  {
    id: 1,
    text: "Upcoming Events",
    icon: <NotepadText color="#3348B3" />,
  },
  {
    id: 2,
    text: "Upcoming Events",

    icon: <Info color="#3348B3" />,
  },
  {
    id: 3,
    text: "Meet the Committees",
    icon: <Users color="#3348B3" />,
  },
  {
    id: 4,
    text: "How To join IEEE",
    icon: <UserRoundPlus color="#3348B3" />,
  },
];

interface IProps {
  setIsOpen: (val: boolean) => void;
}

const ChatBotCard = ({ setIsOpen }: IProps) => {
  const [newChat, setNewChat] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const buttonStatus = !inputValue.trim();
  return (
    <div className="h-150 w-110 mx-auto my-10 flex flex-col justify-between p-2 fixed -bottom-8 right-0 z-100">
      {/* =============Messages=================== */}
      <div className="w-full h-[89%] flex flex-col justify-betweenbg-amber-950 rounded-2xl truncate">
        {/* =============Header=================== */}
        <div className="w-full h-[15%] bg-[#4460EF] flex justify-between items-center px-5 py-3">
          {/* ============First Div Header================= */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-10 ">
              <img
                className="w-full h-full"
                src={"/public/chatbot.png"}
                alt=""
              />
            </div>
            <div className="flex  flex-col justify-center">
              <p className="font-bold text-[20px] text-white m-0 ">
                IEEE AI Assistant
              </p>
              <div className="flex items-center space-x-1 font-normal text-[10px] text-white">
                <span className="w-2  h-2 rounded-full bg-green-700"></span>{" "}
                <span>Online</span>
              </div>
            </div>
          </div>
          {/* ============First Div Header================= */}
          {/* ============Second Div Header================= */}
          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            <OctagonX color="white" />
          </button>
          {/* ============Second Div Header================= */}
        </div>
        {/* =============Header=================== */}
        {/* =============Old Messages============= */}
        <div className="w-full h-[85%] bg-[#FEFEFF] p-2  overflow-y-auto overflow-x-hidden">
          <ChatMessage
            sender="bot"
            text="Hi! I'm the IEEE AI Assistant. How can I help you today?"
          />
          {newChat && (
            <div className="mt-6">
              {boxes.map((box) => (
                <NewChatBox key={box.id} icon={box.icon} text={box.text} />
              ))}
            </div>
          )}
        </div>
        {/* =============Old Messages============= */}
      </div>

      {/* =============Messages=================== */}
      {/* =============Send Message=================== */}
      <div className="flex justify-between w-full h-[10%] rounded-2xl">
        <input
          type="text"
          placeholder="Ask Me Anything....."
          className="h-full w-[84%] bg-[#FEFEFF] rounded-2xl text-[#707073] text-md p-3 focus:outline-0"
          name="question"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="h-full w-[15%] bg-[#FEFEFF] rounded-2xl flex justify-center items-center cursor-pointer"
          onClick={() => setNewChat(false)}
          disabled={buttonStatus}
        >
          <SendHorizontal color="#4460EF" size={25} />
        </button>
      </div>
      {/* =============Send Message=================== */}
    </div>
  );
};

export default ChatBotCard;
