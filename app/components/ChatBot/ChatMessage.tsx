import "./ChatMessage.css";

interface IProps {
  text: string;
  sender: "me" | "bot";
}

const ChatMessage = ({ sender, text }: IProps) => {
  const theme =
    sender == "bot"
      ? {
          className: "text-div-bot",
          photoBg: "bg-[#4460EF]",
          textColor: "text-[#707073]",
          textBg: "bg-[#ECEFFD]",
          boxPostion: "left-0",
          photoPosition: "left-0",
          rowDiv: "flex-row",
          textPosition: "left-12",
        }
      : {
          className: "text-div-me",
          photoBg: "bg-[#4460EF]",
          textColor: "text-[#FEFEFF]",
          textBg: "bg-[#4460EF]",
          boxPostion: "left-20",
          photoPosition: "right-0",
          rowDiv: "flex-row-reverse",
          textPosition: "left-0",
        };
  return (
    <div className={`w-[82%] min-h-25 relative flex flex-col mt-3  ${theme.boxPostion}`}>
      <p
        className={`relative ${theme.textPosition} ${theme.textColor} h-fit w-70 ${theme.textBg} text-wrap rounded-lg p-2 mb-15 ${theme.className}`}
      >
        {text}
      </p>
      <div
        className={`absolute bottom-0 ${theme.photoPosition} flex space-x-2 ${theme.rowDiv}`}
      >
        <div
          className={` flex justify-center items-center w-13 h-13 rounded-full ${theme.photoBg} `}
        >
          <img className="w-9 h-9" src={"/public/chatbot.png"} alt="" />
        </div>
        <p className="text-[12px] text-[#707073]">8:12pm</p>
      </div>
    </div>
  );
};

export default ChatMessage;
