import { motion, AnimatePresence } from "framer-motion";
import { Check, CloudOff, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface AutoSaveIndicatorProps {
  status: "idle" | "saving" | "saved" | "error";
  lastSavedTime?: Date;
}

/**
 * Premium Auto-Save Indicator
 * Shows subtle, non-intrusive save status in the editor
 */
export const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({
  status,
  lastSavedTime,
}) => {
  const [timeAgo, setTimeAgo] = useState<string>("");

  // Update "time ago" every 10 seconds
  useEffect(() => {
    if (!lastSavedTime || status !== "saved") {
      setTimeAgo("");
      return;
    }

    const updateTimeAgo = () => {
      const seconds = Math.floor(
        (new Date().getTime() - lastSavedTime.getTime()) / 1000
      );

      if (seconds < 10) {
        setTimeAgo("just now");
      } else if (seconds < 60) {
        setTimeAgo(`${seconds}s ago`);
      } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        setTimeAgo(`${minutes}m ago`);
      } else {
        const hours = Math.floor(seconds / 3600);
        setTimeAgo(`${hours}h ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [lastSavedTime, status]);

  const getContent = () => {
    switch (status) {
      case "saving":
        return {
          icon: <Loader2 className="w-3.5 h-3.5 animate-spin" />,
          text: "Saving...",
          color: "text-brand-cream-dark",
          bgColor: "bg-brand-cream-light/50",
        };
      case "saved":
        return {
          icon: <Check className="w-3.5 h-3.5" />,
          text: timeAgo ? `Saved ${timeAgo}` : "Saved",
          color: "text-brand-cream-dark",
          bgColor: "bg-brand-cream-light/50",
        };
      case "error":
        return {
          icon: <CloudOff className="w-3.5 h-3.5" />,
          text: "Save failed",
          color: "text-brand-black",
          bgColor: "bg-brand-cream-light/50",
        };
      default:
        return null;
    }
  };

  const content = getContent();

  if (!content) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${content.bgColor} ${content.color} text-xs font-medium`}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {content.icon}
        </motion.div>
        <span>{content.text}</span>
      </motion.div>
    </AnimatePresence>
  );
};
