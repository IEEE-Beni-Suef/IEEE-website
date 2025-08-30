import React from "react";
import { useCommittees } from "../hooks/useApi";
import type { Committee } from "../types";
import { Users } from "lucide-react";
import { Section } from "../components/ui/Section";

const Commitees = () => {
    const { data: committees, isLoading, isError, error } = useCommittees();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center text-red-500">
                {error?.message || "Failed to load committees."}
            </div>
        );
    }

    return (
        <Section id="committees" padding="xl" className="bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
             Our Committees
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover the various committees within our organization, each
              dedicated to specific areas of interest and expertise.
            </p>
          </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
           
                    {committees && (committees as Committee[]).length > 0 ? (
                        (committees as Committee[]).map((committee) => (
                            <div
                                key={committee.id}
                                className="relative flex flex-col text-gray-900 dark:text-white bg-white dark:bg-gray-800 shadow-md bg-clip-border rounded-xl 
                                           border border-gray-300/80 dark:border-gray-700 transform transition-all duration-300 hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 group"
                            >
                                <div className="relative mx-4 mt-4 overflow-hidden text-gray-900 bg-white bg-clip-border rounded-xl">
                                    <img
                                        src={
                                            committee.imageUrl ||
                                            "https://i.pinimg.com/1200x/78/1c/8f/781c8fde22e80756d7fc9b262c6f912d.jpg"
                                        }
                                        alt={`${committee.name} card image`}
                                        className="object-cover w-full h-full aspect-square"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-gray-900 dark:text-gray-100">
                                            {committee.name}
                                        </p>
                                    </div>

                                    {/* Committee description */}
                                    {committee.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-3">
                                            {committee.description}
                                        </p>
                                    )}
                                    
                                    {/* Show member count if available, else show members array length, else N/A */}
                                    <p className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-100 opacity-75">
                                        <Users className="w-4 h-4" />
                                        Members: {committee.memberCount}
                                      
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
        </Section>
    );
};

export default Commitees;
