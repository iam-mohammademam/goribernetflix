import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SliderSkeleton = () => {
  return (
    <div className="w-2/2">
      <div className="rounded-md overflow-hidden">
        <Skeleton height={220} />
      </div>
      <Skeleton width={70} />
      <Skeleton />
    </div>
  );
};
export default SliderSkeleton;
