import React from "react";

interface IProps {
  mainText: string;
  options: string[];
}

const TableSelect = ({ mainText, options }: IProps) => {
  return (
    <select className="px-3 py-2 text-[16px] border border-[#E2E5F0] rounded-lg bg-white text-[#000640] focus:outline-none focus:ring-2 focus:ring-indigo-500">
      <option>{mainText}</option>
      {options.map((option, idx) => (
        <option key={idx}>{option}</option>
      ))}
    </select>
  );
};

export default TableSelect;
