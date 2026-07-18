import type { ReactNode } from "react";
import { useState } from "react";
import { txtSlicer } from "~/utils/utile";
import { Pencil, Trash2 } from "lucide-react";

interface IProps {
  id: number;
  img: string;
  title: string;
  description: string;
  isActionLoading?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  children?: ReactNode;
}

const DEFAULT_IMAGE = "/SocialMedia.png";

const SponsorCard = ({
  description,
  img,
  title,
  isActionLoading,
  onEdit,
  onDelete,
}: IProps) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const finalImageUrl = imageError || !img ? DEFAULT_IMAGE : img;

  return (
    <div className="relative w-3xs h-60 bg-white rounded-4xl flex flex-col justify-evenly items-center bt-0.5 shadow-[0px_2px_0px_#ABBED166] group">
      {/* Actions (Edit / Delete) */}
      {(onEdit || onDelete) && (
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={onEdit}
              disabled={isActionLoading}
              className="p-1.5 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors disabled:opacity-50"
              title="Edit Sponsor"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              disabled={isActionLoading}
              className="p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors disabled:opacity-50"
              title="Delete Sponsor"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <div className="h-24 w-48 rounded-lg truncate">
        <img
          className="w-full h-full object-cover"
          src={finalImageUrl}
          alt={title}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="w-fit flex flex-col space-y-0.5">
        <h2 className="text-center font-bold text-xl">
          {txtSlicer(title, 15)}
        </h2>
        <p className="text-center p-0 text-[#364DBF]">
          {txtSlicer(description, 25)}
        </p>
      </div>
    </div>
  );
};

export default SponsorCard;
