import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EditorModuleSelector } from "./EditorModuleSelector";
import type { EditorModule } from "./EditorModuleSelector";
import { transitions } from "../../utils/animations";

interface MobileModulesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: EditorModule;
  onModuleChange: (module: EditorModule) => void;
  children: React.ReactNode; // Module content
}

export const MobileModulesDrawer = ({
  isOpen,
  onClose,
  activeModule,
  onModuleChange,
  children,
}: MobileModulesDrawerProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transitions.quick}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ ...transitions.smooth, type: "tween" }}
            className="fixed bottom-0 left-0 right-0 bg-[#1e1e1e] rounded-t-2xl shadow-2xl z-50 max-h-[80vh] flex flex-col md:hidden safe-area-bottom"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Handle */}
            <div className="flex items-center justify-center py-3 border-b border-gray-700">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <h3 className="text-base font-semibold text-white">
                Editor Tools
              </h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-sm transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-gray-400" />
              </motion.button>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              <div className="p-4 space-y-4">
                {/* Module Selector */}
                <EditorModuleSelector
                  activeModule={activeModule}
                  onModuleChange={(module) => {
                    onModuleChange(module);
                    // Don't close drawer, let user interact with module
                  }}
                />

                <div className="h-px bg-gray-700" />

                {/* Module Content */}
                <div className="min-h-[300px] text-white">{children}</div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
