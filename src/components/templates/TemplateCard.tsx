import { useNavigate } from "react-router-dom";
import { Heart, Crown } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { scaleIn, transitions } from "../../utils/animations";
import { TemplatePreview } from "./TemplatePreview";
import type { CanvasDesignData } from "../../types/fabric";

interface TemplateCardProps {
  _id: string;
  name: string;
  category: string;
  subcategory?: string;
  thumbnail: string;
  designData?: CanvasDesignData;
  isPremium?: boolean;
  onQuickView?: (id: string) => void;
}

export const TemplateCard = ({
  _id,
  name,
  category,
  subcategory,
  thumbnail,
  designData,
  isPremium = false,
  onQuickView,
}: TemplateCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    navigate(`/editor/${_id}`);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickView?.(_id);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Category display names
  const categoryNames: { [key: string]: string } = {
    birthday: "Birthday",
    wedding: "Wedding",
    "baby-shower": "Baby Shower",
    baby_shower: "Baby Shower",
    party: "Party",
    holiday: "Holiday",
    christmas: "Christmas",
    other: "Other",
  };

  // Subcategory display names
  const subcategoryNames: { [key: string]: string } = {
    kids: "Kids",
    teen: "Teen",
    adult: "Adult",
    milestone: "Milestone",
    themed: "Themed",
    formal: "Formal",
    casual: "Casual",
  };

  return (
    <motion.div
      variants={scaleIn}
      initial="initial"
      animate="animate"
      whileHover={{
        scale: 1.02,
        transition: transitions.quick,
      }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="overflow-hidden cursor-pointer group"
    >
      {/* Premium Card Container with Envelope Effect */}
      <div className="relative">
        {/* Background "Envelope" Layer */}
        <div className="absolute inset-0 bg-brand-cream rounded-sm transform transition-transform duration-500 group-hover:-translate-y-1" />

        {/* Main Card */}
        <div className="aspect-[3/4] relative overflow-hidden rounded-sm bg-white shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-2">
          {/* Card Content */}
          <div className="relative w-full h-full">
            {designData ? (
              <TemplatePreview
                designData={designData}
                fallbackThumbnail={thumbnail}
                className="w-full h-full"
              />
            ) : thumbnail ? (
              <img
                src={thumbnail}
                alt={name}
                className="w-full h-full object-contain bg-brand-ivory"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-ivory to-brand-cream text-6xl">
                ✉️
              </div>
            )}

            {/* Premium Badge */}
            {isPremium && (
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-brand-gold text-white text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-md">
                <Crown className="w-3 h-3" />
                Premium
              </div>
            )}

            {/* Favorite Button */}
            <motion.button
              onClick={toggleFavorite}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={transitions.quick}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white z-10"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-brand-charcoal/40 hover:text-red-400"
                }`}
              />
            </motion.button>

            {/* Hover Overlay */}
            <div
              className={`absolute inset-0 bg-brand-charcoal/0 transition-all duration-300 flex items-center justify-center ${isHovered ? "bg-brand-charcoal/20" : ""}`}
            >
              {isHovered && onQuickView && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={transitions.quick}
                  onClick={handleQuickView}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2.5 bg-white text-brand-charcoal rounded-sm font-medium text-sm hover:bg-brand-charcoal hover:text-white transition-all shadow-lg"
                >
                  Quick View
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="pt-4 pb-2">
        <h4 className="text-base font-medium text-brand-charcoal mb-1 truncate group-hover:text-brand-cream-dark transition-colors">
          {name}
        </h4>
        <div className="flex items-center gap-1.5 text-xs text-brand-charcoal/50">
          <span>{categoryNames[category] || category}</span>
          {subcategory && (
            <>
              <span className="text-brand-charcoal/30">•</span>
              <span>{subcategoryNames[subcategory] || subcategory}</span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};
