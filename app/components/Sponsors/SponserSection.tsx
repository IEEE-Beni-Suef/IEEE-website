import { Building2 } from "lucide-react";
import type { ISponsorCard } from "~/types";
import SponsorCard from "./SponsorCard";
import { useAllSponsors } from "~/hooks/useApi";

const SponsorsSection = () => {
  const { data: sponsors, isLoading, isError } = useAllSponsors();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
        <p className="text-gray-600 mt-4">Loading Sponsors...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">Failed to load sponsors. Please try again later.</p>
      </div>
    );
  }

  // ✅ Empty array → show "no data" message
  if (!sponsors || sponsors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <Building2 className="w-16 h-16 text-gray-300" />
        <h3 className="text-xl font-semibold text-gray-500">No Sponsors Yet</h3>
        <p className="text-gray-400 text-sm max-w-sm">
          There are no sponsors available at the moment. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="pt-9 container my-5 mx-auto px-40 relative">
      <div
        className={`${
          sponsors.length > 3
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            : "flex flex-wrap justify-center items-center"
        } gap-x-5 gap-y-5 p-5`}
      >
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
    </div>
  );
};

export default SponsorsSection;
