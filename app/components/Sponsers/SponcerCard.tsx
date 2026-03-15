import { txtSlicer } from "~/utils/utile";

interface IProps {
  img: string;
  title: string;
  description: string;
}

const SponserCard = ({ description, img, title }: IProps) => {
  return (
    <div className="m-auto  md:w-fit lg:w-sm rounded-lg h-80 flex flex-col pb-5 bt-0.5 cursor-pointer hover:bg-gray-100 hover:-translate-y-2 transform transition duration-300">
      <div className="h-65 rounded-lg truncate">
        <img className="w-full h-full " src={img} alt="" />
      </div>
      <div className="h-full flex flex-col space-y-2 px-4">
        <h2 className="text-center mt-8 font-bold text-xl">{title}</h2>
        <p className="text-center p-0 flex flex-wrap">
          {txtSlicer(description, 150)}
        </p>
      </div>
    </div>
  );
};

export default SponserCard;
