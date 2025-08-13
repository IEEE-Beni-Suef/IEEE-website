import React from "react";
import { useCommittees } from "../hooks/useApi";
import type { Committee } from "../types";

const Commitees = () => {
    const { data: committees, isLoading, isError, error } = useCommittees();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                {error?.message || "Failed to load committees."}
            </div>
        );
    }

    return (
        <div className="flex items-center min-h-screen">
            <div className="max-w-full mx-auto mt-40 ">
                <div className="flex flex-wrap flex-start gap-8 pl-64">
                    {committees && (committees as Committee[]).length > 0 ? (
                        (committees as Committee[]).map((committee) => (
                            <div
                                key={committee.id}
                                className="relative flex flex-col text-gray-700 bg-gray-300 shadow-md bg-clip-border rounded-xl w-72"
                            >
                                <div className="relative mx-4 mt-4 overflow-hidden text-gray-900 bg-white bg-clip-border rounded-xl h-56">
                                    <img
                                        src={
                                            (committee as any).imageUrl ||
                                            "https://i.pinimg.com/1200x/78/1c/8f/781c8fde22e80756d7fc9b262c6f912d.jpg"
                                        }
                                        alt={`${committee.name} card image`}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                                            {committee.name}
                                        </p>
                                    </div>
                                    {/* Show member count if available, else show members array length, else N/A */}
                                    <p className="flex items-center gap-1 text-sm text-gray-700 opacity-75">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2}
                                            stroke="currentColor"
                                            className="w-4 h-4"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                                            />
                                        </svg>
                                        Members:{" "}
                                        {typeof (committee as any)
                                            .memberCount === "number"
                                            ? (committee as any).memberCount
                                            : Array.isArray(
                                                    (committee as any).members
                                                )
                                              ? (committee as any).members
                                                    .length
                                              : "N/A"}
                                        <span className="ml-5 px-5 py-1 bg-blue-500 text-gray-200 text-xs rounded-full hover:bg-blue-700">
                                            Technical
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500">
                            No committees found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Commitees;
