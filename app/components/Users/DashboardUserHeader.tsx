import { Download, Plus } from "lucide-react";

interface IProps {
  handleCreateClick: () => void;
}

const DashboardUserHeader = ({ handleCreateClick }: IProps) => {
  return (
    <>
      <div className="hidden md:flex items-center w-full h-10 border-1 border-[#CCB5E3] px-5 capitalize rounded-lg mt-3 mb-8 ">
        <span className="text-[#6C757D] text-sm">dashboard / </span>{" "}
        <span className="text-[#000640] font-semibold text-sm">
          &nbsp;users
        </span>
      </div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text[#000640]">
              Users Management
            </h1>
            <p className="mt-2 text-sm text-[#6C757D]">
              Manage and oversee all IEEE members and their details
            </p>
          </div>
          <div className="flex items-center space-x-1.5 mt-4 sm:mt-0">
            <button
              // ** TO DO What should do here
              // onClick={handleCreateClick}
              className="flex justify-center w-35 h-9 px-3 space-x-1.5 items-center rounded-xl shadow-sm text-xs md:text-sm font-medium text-[#5A10A5] bg-transparent border border-[#5A10A5]"
            >
              <Download size={16} />
              <p>Import CSV</p>
            </button>
            <button
              onClick={handleCreateClick}
              className="flex justify-center w-45 h-9 px-3 space-x-1 items-center rounded-xl shadow-sm text-xs md:text-sm font-medium text-white bg-linear-to-br from-[#5A10A5] to-[#4460EF]"
            >
              <Plus size={18} />
              <p className="font-semibold font-sm">Add New Member</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardUserHeader;
