import { BookOpen } from "lucide-react";
import type { ISponsorCard } from "~/types";
import SponsorCard from "./SponsorCard";
const sponsors: ISponsorCard[] = [
  {
    id: 1,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Diamond Partner",
  },
  {
    id: 2,
    img: "/Creativa.jpg",
    title: "Creativa-Hub Beni-Suef",
    description:
      "Diamond Partner",
  },
  {
    id: 3,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Diamond Partner",
  },
  {
    id: 4,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Diamond Partner",
  },
  {
    id: 5,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Diamond Partner",
  },
  {
    id: 6,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Diamond Partner",
  },
  {
    id: 7,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Diamond Partner",
  },
  {
    id: 8,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem odit ex aperiam? Ipsa, quisquam repudiandae! Tempora voluptatum ea nemo! Impedit?",
  },
  
];  

const SponsorsSection = () => {
  const isLoading = false; 
  const isError = false;

  return (
    <div className="pt-9 container my-5 mx-auto px-40 ">
      <div className="flex items-center justify-center mb-20 text-center">
        <h1 className="text-4xl font-bold text-center">Sponsors & Partners</h1>
      </div>

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Loading Sponsors...
          </p>
        </div>
      ) : isError ? (
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">
            Failed to load sponsor s. Please try again later.
            
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
          <p className="text-gray-600 dark:text-gray-400">
            No sponsor s available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default SponsorsSection;
