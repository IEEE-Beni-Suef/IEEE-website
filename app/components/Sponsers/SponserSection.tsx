import { sponsers } from "~/utils/lists";
import SponserCard from "./SponcerCard";
import { BookOpen } from "lucide-react";
import AddSponserForm from "./AddSponserForm";

const renderSponsersCards = sponsers.map((sponser) => (
  <SponserCard
    key={sponser.id}
    description={sponser.description}
    img={sponser.img}
    title={sponser.title}
  />
));

const isLoading = false;
const error = false;

const SponsersSection = () => {
  return (
    <div className="w-screen my-5 mx-auto px-5">
      <h1 className="text-4xl font-bold mb-5 text-center">Our Sponsers</h1>
      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400 mt-4">
            Loading Sponsers...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-600 dark:text-red-400">
            Failed to load sponsers. Please try again later.
          </p>
        </div>
      ) : sponsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-10 p-5">
          {renderSponsersCards}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            No sponsers available at the moment.
          </p>
          <AddSponserForm />
        </div>
      )}
    </div>
  );
};

export default SponsersSection;

{
  /* */
}
