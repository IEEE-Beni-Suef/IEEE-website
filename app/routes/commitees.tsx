import React from "react";
import { useCommittees } from "../hooks/useApi";
import type { Committee } from "../types";
import { Users } from "lucide-react";
import { Section } from "../components/ui/Section";
import CommitteesSection from "~/components/Committees/CommitteeSection";

const Commitees = () => {
  const { data: committees, isLoading, isError, error } = useCommittees();

  return (
    <div
      className="bg-slate-50 min-h-screen w-screen md:px-10 my-25 "
      id="committees"
    >
      <div className=" flex flex-col items-center justify-center space-y-5">
        {/* HEADER========================================= */}
        <div className="w-36.75 h-8.25 flex justify-center items-center bg-[#CCB5E3] text-[#5A10A5] rounded-[20px] text-[11px] font-semibold">
          The Heart Of IEEE
        </div>
        {/* HEADER========================================= */}

        {/* TITLE========================================= */}
        <h1 className="font-bold text-5xl text-[#0E2C5E] text-center">
          Explore Our <span className="text-[#5A10A5]">Committees</span>
        </h1>
        {/* TITLE========================================= */}

        {/* DESCROPTION========================================= */}
        <p className="w-full md:w-154.5 font-medium text-[18px] text-[#4460EF] text-center">
          Join a specialized community where students push the boundaries of
          technology and leadership. Chooese your path and start building the
          future today.
        </p>
        {/* DESCROPTION========================================= */}
        <CommitteesSection error={error} isLoading={isLoading} isError={isError} committees={committees || []} />
      </div>
    </div>
  );
};

export default Commitees;
