
import React from 'react';
import { useCommittees } from "../hooks/useApi";
import type { Committee } from "../types";

const Commitees = () => {
  const { data: committees, isLoading, isError, error } = useCommittees();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error?.message || "Failed to load committees."}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-[720px] mx-auto">
        <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
          <a
            target="_blank"
            href="https://www.material-tailwind.com/docs/html/card"
            className="block w-full px-4 py-2 text-center text-slate-700 transition-all"
            rel="noreferrer"
          >
            More components on <b>Material Tailwind</b>.
          </a>
        </div>

        <div className="flex flex-col gap-6">
          {committees && (committees as Committee[]).length > 0 ? (
            (committees as Committee[]).map((committee) => (
              <div
                key={committee.id}
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96"
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
                  <img
                    src={(committee as any).imageUrl || '/favicon.ico'}
                    alt={`${committee.name} card image`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {committee.name}
                    </p>
                  </div>
                  {/* Show member count if available, else show members array length, else N/A */}
                  <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                    Members: {
                      typeof (committee as any).memberCount === 'number'
                        ? (committee as any).memberCount
                        : Array.isArray((committee as any).members)
                          ? (committee as any).members.length
                          : 'N/A'
                    }
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No committees found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Commitees;
