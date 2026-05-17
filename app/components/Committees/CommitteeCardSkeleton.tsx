import { Skeleton } from "@mui/material";

const CommitteeCardSkeleton = () => {
  return (
    <div className="h-133 w-xs flex flex-col justify-evenly bg-gray-200 rounded-2xl px-4">
      <Skeleton width={"full"} height={300} variant="rounded" />
      <Skeleton width={200} height={40} />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton width={150} />
    </div>
  );
};

export default CommitteeCardSkeleton;
