import { motion } from "framer-motion";
import {
  Type,
  Image,
  Palette,
  Sparkles,
  Layers,
  Undo2,
  Redo2,
  Save,
  ChevronUp,
} from "lucide-react";
import type { EditorModule } from "./EditorModuleSelector";

interface MobileBottomToolbarProps {
  activeModule: EditorModule;
  onModuleChange: (module: EditorModule) => void;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onOpenModules: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isSaving: boolean;
}

export const MobileBottomToolbar = ({
  activeModule,
  onModuleChange,
  onUndo,
  onRedo,
  onSave,
  onOpenModules,
  canUndo,
  canRedo,
  isSaving,
}: MobileBottomToolbarProps) => {
  const modules: Array<{ id: EditorModule; icon: any; label: string }> = [
    { id: "text", icon: Type, label: "Text" },
    { id: "images", icon: Image, label: "Images" },
    { id: "background", icon: Palette, label: "BG" },
    { id: "stickers", icon: Sparkles, label: "Stickers" },
    { id: "layers", icon: Layers, label: "Layers" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 md:hidden safe-area-bottom">
      <div className="grid grid-cols-7 gap-1 p-2">
        {/* Quick Actions - Undo/Redo */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-sm min-h-[56px] ${
            canUndo
              ? "text-brand-black hover:bg-brand-cream-light"
              : "text-gray-300"
          }`}
          aria-label="Undo"
        >
          <Undo2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Undo</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRedo}
          disabled={!canRedo}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-sm min-h-[56px] ${
            canRedo
              ? "text-brand-black hover:bg-brand-cream-light"
              : "text-gray-300"
          }`}
          aria-label="Redo"
        >
          <Redo2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">Redo</span>
        </motion.button>

        {/* Module Quick Access - First 3 */}
        {modules.slice(0, 3).map((module) => {
          const Icon = module.icon;
          const isActive = activeModule === module.id;
          return (
            <motion.button
              key={module.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => onModuleChange(module.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-sm min-h-[56px] transition-colors ${
                isActive
                  ? "bg-brand-orange text-white"
                  : "text-brand-black hover:bg-brand-cream-light"
              }`}
              aria-label={module.label}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{module.label}</span>
            </motion.button>
          );
        })}

        {/* More Modules Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onOpenModules}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-sm min-h-[56px] text-brand-black hover:bg-brand-cream-light"
          aria-label="More tools"
        >
          <ChevronUp className="w-5 h-5 mb-1" />
          <span className="text-[10px] font-medium">More</span>
        </motion.button>

        {/* Save Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onSave}
          disabled={isSaving}
          className={`flex flex-col items-center justify-center py-2 px-1 rounded-sm min-h-[56px] ${
            isSaving
              ? "bg-brand-black/50 text-white"
              : "bg-brand-black text-white hover:bg-brand-black/90"
          }`}
          aria-label="Save"
        >
          <Save className={`w-5 h-5 mb-1 ${isSaving ? "animate-pulse" : ""}`} />
          <span className="text-[10px] font-medium">
            {isSaving ? "..." : "Save"}
          </span>
        </motion.button>
      </div>
    </div>
  );
};
