import { BookOpen } from "lucide-react";
import type { ISponsorCard } from "~/types";
import SponsorCard from "./SponsorCard";
import { useAllSponsors } from "~/hooks/useApi";

const SponsorsSection = () => {
  const { data: sponsors, isLoading, isError } = useAllSponsors();

  return (
    <div className="pt-9 container my-5 mx-auto px-40 relative">

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="text-gray-600 mt-4">
            Loading Sponsors...
          </p>
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-red-600">
            Failed to load sponsors. Please try again later.
          </p>
        </div>
      ) : sponsors && sponsors.length > 0 ? (
        <div className={`${
  sponsors.length > 3
    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    : "flex flex-wrap justify-center items-center"
         } gap-x-5 gap-y-5 p-5`}>
          {sponsors.map((sponsor: ISponsorCard) => (
            <SponsorCard
              key={sponsor.id}
              id={sponsor.id}
              description={sponsor.description}
              img={sponsor.img}
              title={sponsor.title}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">
            No sponsors available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default SponsorsSection;
