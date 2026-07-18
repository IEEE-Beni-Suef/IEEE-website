import SponsorsSection from "~/components/Sponsors/SponserSection";

const Sponsers = () => {
  return (
    <div className="pt-9 container mx-auto px-10 xl:px-40 my-20">
      <div className="flex items-center justify-center mb-20 text-center">
        <h1 className="text-4xl font-bold text-center">Sponsors & Partners</h1>
      </div>
      <SponsorsSection />
    </div>
  );
};

export default Sponsers;
