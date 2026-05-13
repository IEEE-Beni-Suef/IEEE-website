import  { type ReactNode } from 'react';

interface IProps  {
    text:string,
    icon:ReactNode
}

const NewChatBox = ({icon , text} : IProps) => {
  return (
    <div className='w-full h-13 flex gap-2 mt-5 items-center ps-3 border-transparent rounded-2xl shadow-[0_0_4px_0_rgba(0,0,0,0.50)]'>
      {icon}
      <p className='text-[#000640] text-[16px] font-medium'>{text}</p>
    </div>
  );
};

export default NewChatBox;