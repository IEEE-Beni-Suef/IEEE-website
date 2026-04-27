import type { ISponsorCard } from "~/types";
import SponsorsSection from "~/components/Sponsors/SponserSection";
const sponsors: ISponsorCard[] = [
  {
    id: 1,
    img: "/Creativa.jpg",
    title: "Tech",
    description: "Diamond Partner",
  },
  {
    id: 2,
    img: "/Creativa.jpg",
    title: "Creativa-Hub Beni-Suef",
    description: "Diamond Partner",
  },
  {
    id: 3,
    img: "/Creativa.jpg",
    title: "Tech",
    description: "Diamond Partner",
  },
  {
    id: 4,
    img: "/Creativa.jpg",
    title: "Tech",
    description: "Diamond Partner",
  },
  {
    id: 5,
    img: "/Creativa.jpg",
    title: "Tech",
    description: "Diamond Partner",
  },
  {
    id: 6,
    img: "/Creativa.jpg",
    title: "Tech",
    description: "Diamond Partner",
  },
  {
    id: 7,
    img: "/Creativa.jpg",
    title: "Tech",
    description: "Diamond Partner",
  },
  {
    id: 8,
    img: "/Creativa.jpg",
    title: "Tech",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem odit ex aperiam? Ipsa, quisquam repudiandae! Tempora voluptatum ea nemo! Impedit?",
  },
];

const Sponsers = () => {
  const isLoading = false;
  const isError = false;

  return (
    <div className="pt-9 container mx-auto px-40 my-20" >
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
      ) : (
        <SponsorsSection />
      )}
    </div>
  );
};

export default Sponsers;
