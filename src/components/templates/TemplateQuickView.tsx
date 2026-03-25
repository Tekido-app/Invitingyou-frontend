import { X, Sparkles, Calendar, Users, MapPin } from "lucide-react";
import type { Template } from "../../services/templateAPI";
import { useNavigate } from "react-router-dom";
import { TemplatePreview } from "./TemplatePreview";
import { motion, AnimatePresence } from "framer-motion";
import { transitions } from "../../utils/animations";

interface TemplateQuickViewProps {
  template: Template;
  onClose: () => void;
}

export const TemplateQuickView = ({
  template,
  onClose,
}: TemplateQuickViewProps) => {
  const navigate = useNavigate();

  const handleUseTemplate = () => {
    navigate(`/editor/${template._id}`);
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

  const subcategoryNames: { [key: string]: string } = {
    kids: "Kids",
    teen: "Teen",
    adult: "Adult",
    milestone: "Milestone",
    themed: "Themed",
    formal: "Formal",
    casual: "Casual",
  };

  const styleNames: { [key: string]: string } = {
    modern: "Modern",
    classic: "Classic",
    playful: "Playful",
    elegant: "Elegant",
    minimalist: "Minimalist",
    vintage: "Vintage",
    festive: "Festive",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={transitions.quick}
        className="fixed inset-0 z-50 flex items-center justify-center md:p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={transitions.smooth}
          onClick={(e) => e.stopPropagation()}
          className="bg-white md:rounded-sm shadow-2xl w-full h-full md:h-auto md:max-w-4xl md:max-h-[90vh] overflow-hidden"
        >
          {/* Header - Touch Friendly */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex-1 min-w-0 pr-4">
              <h2 className="text-xl md:text-2xl font-bold text-brand-mirage flex items-center gap-2 truncate">
                <span className="truncate">{template.name}</span>
                {template.isPremium && (
                  <span className="inline-flex items-center gap-1 px-2 md:px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold rounded-full shrink-0">
                    <Sparkles className="w-3 h-3" />
                    <span className="hidden sm:inline">Premium</span>
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-2 mt-1 text-xs md:text-sm text-gray-600 overflow-x-auto hide-scrollbar">
                <span className="capitalize whitespace-nowrap">
                  {categoryNames[template.category] || template.category}
                </span>
                {template.subcategory && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="capitalize text-brand-sea whitespace-nowrap">
                      {subcategoryNames[template.subcategory] ||
                        template.subcategory}
                    </span>
                  </>
                )}
                {template.style && (
                  <>
                    <span className="text-gray-400">•</span>
                    <span className="capitalize text-brand-orange whitespace-nowrap">
                      {styleNames[template.style] || template.style}
                    </span>
                  </>
                )}
              </div>
            </div>
            {/* Touch-friendly close button */}
            <motion.button
              onClick={onClose}
              whileTap={{ scale: 0.95 }}
              className="p-2 md:p-2 hover:bg-gray-100 rounded-sm transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center shrink-0"
              aria-label="Close"
            >
              <X className="w-6 h-6 text-gray-500" />
            </motion.button>
          </div>

          {/* Content - Mobile: Single Column, Desktop: Two Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-140px)] md:max-h-[calc(90vh-180px)]">
            {/* Preview */}
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-gray-100 rounded-sm overflow-hidden shadow-lg">
                {template.designData ? (
                  <TemplatePreview
                    designData={template.designData}
                    fallbackThumbnail={template.thumbnail}
                    className="w-full h-full"
                  />
                ) : template.thumbnail ? (
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-sand to-brand-sea/20">
                    <span className="text-6xl">🎨</span>
                  </div>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-4 md:space-y-6">
              <div>
                <h3 className="font-bold text-base md:text-lg text-brand-mirage mb-3">
                  Template Features
                </h3>
                {template.features && template.features.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {template.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-brand-sand text-brand-mirage text-xs md:text-sm font-medium rounded-full capitalize"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No features listed</p>
                )}
              </div>

              <div>
                <h3 className="font-bold text-base md:text-lg text-brand-mirage mb-3">
                  Perfect For
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-brand-mirage text-sm md:text-base">
                        Event Type
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 capitalize">
                        {categoryNames[template.category] || template.category}
                        {template.subcategory &&
                          ` - ${
                            subcategoryNames[template.subcategory] ||
                            template.subcategory
                          }`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-brand-mirage text-sm md:text-base">
                        Style
                      </p>
                      <p className="text-xs md:text-sm text-gray-600 capitalize">
                        {template.style
                          ? styleNames[template.style] || template.style
                          : "Versatile"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-orange mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-medium text-brand-mirage text-sm md:text-base">
                        Customization
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        Fully editable text, colors, and layout
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {template.isPremium && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-sm p-3 md:p-4">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-semibold text-yellow-900 mb-1 text-sm md:text-base">
                        Premium Template
                      </p>
                      <p className="text-xs md:text-sm text-yellow-800">
                        This template includes premium features and advanced
                        customization options.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Touch-friendly CTA button */}
              <motion.button
                onClick={handleUseTemplate}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 md:py-3 min-h-[48px] bg-brand-orange text-white font-semibold rounded-sm hover:bg-brand-orange/90 transition-colors shadow-md hover:shadow-lg text-base"
              >
                Use This Template
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
