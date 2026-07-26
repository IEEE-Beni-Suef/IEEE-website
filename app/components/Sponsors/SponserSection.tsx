import { Building2 } from "lucide-react";
import type { ISponsorCard } from "~/types";
import SponsorCard from "./SponsorCard";
import { useAllSponsors } from "~/hooks/useApi";
import SponsersSkeleton from "./SponsorSkeleton";

const SponsorsSection = () => {
  const { data: sponsors, isLoading, isError } = useAllSponsors();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
        {Array.from({ length: 4 }, (_, idx) => (
          <SponsersSkeleton key={idx} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">
          Failed to load sponsors. Please try again later.
        </p>
      </div>
    );
  }

  if (!sponsors || sponsors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
        <Building2 className="w-12 h-12 text-[#CCB5E3]" />
        <h3 className="text-lg font-semibold text-[#000640]">No Sponsors Found</h3>
        <p className="text-gray-500 text-sm max-w-sm">
          There are currently no sponsors available in the database.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2 justify-items-center"
    >
      {sponsors.map((sponsor: ISponsorCard) => (
        <SponsorCard
          key={sponsor.id}
          id={sponsor.id}
          description={sponsor.description ?? ""}
          img={sponsor.img}
          title={sponsor.title || sponsor.name || ""}
        />
      ))}
    </div>
  );
};

export default SponsorsSection;
