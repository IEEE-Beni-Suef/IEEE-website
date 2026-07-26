import  { type ReactNode } from 'react';

interface IProps  {
    text: string;
    icon: ReactNode;
    onClick?: () => void;
}

const NewChatBox = ({ icon, text, onClick }: IProps) => {
  return (
    <div 
      onClick={onClick}
      className='w-full h-13 flex gap-3 mt-3 items-center px-4 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:bg-purple-50/50 cursor-pointer transition-all duration-200'
    >
      {icon}
      <p className='text-[#000640] text-sm font-semibold'>{text}</p>
    </div>
  );
};

export default NewChatBox;