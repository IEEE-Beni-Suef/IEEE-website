import { OctagonX, SendHorizontal } from "lucide-react";

const ChatBotCard = () => {
  return (
    <div className="h-137.5 w-100 bg-gray-400 mx-auto my-10 flex flex-col justify-between p-2 ">
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
          <button className="cursor-pointer" onClick={() => {}}>
            <OctagonX color="white" />
          </button>
          {/* ============Second Div Header================= */}
        </div>
        {/* =============Header=================== */}
        {/* =============Old Messages============= */}
        <div className="w-full h-[85%] bg-[#FEFEFF] "></div>
        {/* =============Old Messages============= */}
      </div>
      {/* =============Messages=================== */}
      {/* =============Send Message=================== */}
      <div className="flex justify-between w-full h-[10%] rounded-2xl">
        <input
          type="text"
          placeholder="Ask Me Anything....."
          className="h-full w-[84%] bg-[#FEFEFF] rounded-2xl text-[#707073] text-md p-3"
        />
        <button className="h-full w-[15%] bg-[#FEFEFF] rounded-2xl flex justify-center items-center cursor-pointer">
          <SendHorizontal color="#4460EF" size={25}/>
        </button>
      </div>
      {/* =============Send Message=================== */}
    </div>
  );
};

export default ChatBotCard;
