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
    <div className="relative w-full max-w-[280px] h-[280px] bg-white rounded-[28px] p-5 flex flex-col justify-between items-center border border-[#CCB5E3]/80 hover:border-[#5A10A5] shadow-sm hover:shadow-xl transition-all duration-300 group">
      {/* Actions (Edit / Delete) */}
      {(onEdit || onDelete) && (
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onEdit && (
            <button
              onClick={onEdit}
              disabled={isActionLoading}
              className="p-1.5 bg-purple-100 text-[#5A10A5] rounded-full hover:bg-purple-200 transition-colors disabled:opacity-50"
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

      {/* Image Container */}
      <div className="h-32 w-full rounded-[20px] overflow-hidden shrink-0 bg-gray-50 flex items-center justify-center p-2 border border-gray-100">
        <img
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          src={finalImageUrl}
          alt={title}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Title & Description Container */}
      <div className="w-full flex flex-col space-y-1 text-center mt-2">
        <h3 className="font-bold text-lg text-[#000640] line-clamp-1">
          {txtSlicer(title, 22)}
        </h3>
        <p className="text-xs text-gray-500 font-medium line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SponsorCard;
