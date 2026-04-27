import React from "react";
import { useCommittees } from "../hooks/useApi";
import type { Committee } from "../types";
import { Users } from "lucide-react";
import { Section } from "../components/ui/Section";
import CommitteesSection from "~/components/Committees/CommitteeSection";

const Commitees = () => {
  //   const { data: committees, isLoading, isError, error } = useCommittees();

  const isLoading = false;
  const isError = false;

  if (isLoading) {
    return <div className="flex justify-center items-center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center text-red-500">
        {/* {error?.message || "Failed to load committees."} */}
        {"Failed to load committees."}
      </div>
    );
  }

  return (
    <>
      <CommitteesSection />
    </>
  );
};

export default Commitees;
