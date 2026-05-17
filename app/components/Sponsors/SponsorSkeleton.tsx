import Skeleton from "@mui/material/Skeleton";

const SponsersSkeleton = () => {
  return (
    <>
      <div className="w-3xs h-60 bg-gray-200 rounded-4xl flex flex-col justify-evenly items-center bt-0.5 cursor-pointer ">
        <Skeleton width={200} height={100} variant="rounded" />
        <div className="w-fit flex flex-col space-y-0.5">
          <Skeleton
            width={200}
            height={30}
            className="text-center font-bold text-xl"
          />
          <Skeleton className="text-center p-0 text-[#364DBF]" />
        </div>
      </div>
    </>
  );
};

export default SponsersSkeleton;
