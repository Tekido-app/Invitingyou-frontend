import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import * as fabric from "fabric";
import type { ObjectProperties } from "../types/fabric";
import { FabricCanvas } from "../components/editor/FabricCanvas";
import { ColorPicker } from "../components/editor/ColorPicker";
import { TextToolbar } from "../components/editor/TextToolbar";
import { ImageUploader } from "../components/editor/ImageUploader";
import { EditorModuleSelector } from "../components/editor/EditorModuleSelector";
import { AutoSaveIndicator } from "../components/editor/AutoSaveIndicator";
import { MobileBottomToolbar } from "../components/editor/MobileBottomToolbar";
import { MobileModulesDrawer } from "../components/editor/MobileModulesDrawer";
import { MobilePropertiesPanel } from "../components/editor/MobilePropertiesPanel";
import type { EditorModule } from "../components/editor/EditorModuleSelector";
import {
  TextModule,
  BackgroundModule,
  LayersModule,
  StickersModule,
} from "../components/editor/modules";
import { useTemplate } from "../hooks/useTemplates";
import api from "../services/api";

/**
 * Editor page - Fabric.js canvas editor for customizing invitation templates
 * Stage 2.4: Save Design to Event
 */
export const Editor = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedObject, setSelectedObject] =
    useState<fabric.FabricObject | null>(null);

  // Event state for saving
  const [eventId, setEventId] = useState<string | null>(
    searchParams.get("eventId")
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [lastSavedTime, setLastSavedTime] = useState<Date | undefined>();
  const [eventData, setEventData] = useState<any>(null);
  const [loadingEvent, setLoadingEvent] = useState(false);

  // Fetch template data using React Query
  const {
    data: templateData,
    isLoading,
    isError,
    error,
  } = useTemplate(templateId || "");

  // History State for Undo/Redo
  const [history, setHistory] = useState<string[]>([]);
  const [historyStep, setHistoryStep] = useState<number>(-1);
  const processingRef = useRef(false);
  const skipLoadRef = useRef(false);

  // Module system state
  const [activeModule, setActiveModule] = useState<EditorModule>("text");

  // Mobile state management
  const [isMobileModulesOpen, setIsMobileModulesOpen] = useState(false);
  const [isMobilePropertiesOpen, setIsMobilePropertiesOpen] = useState(false);

  // Design System Toggle (for future, forcing dark mode sidebars for now)
  // const isDarkMode = true;

  const historyStepRef = useRef(-1);
  useEffect(() => {
    historyStepRef.current = historyStep;
  }, [historyStep]);

  // Load event data if eventId is present (only on initial load, not after save)
  useEffect(() => {
    const loadEvent = async () => {
      if (!eventId) return;

      // Skip loading if we just saved (to avoid canvas reset)
      if (skipLoadRef.current) {
        skipLoadRef.current = false;
        return;
      }

      setLoadingEvent(true);
      try {
        const response = await api.get(`/api/events/${eventId}`);
        if (response.data.success && response.data.event) {
          setEventData(response.data.event);
        }
      } catch (err) {
        console.error("Failed to load event:", err);
        // If event not found, clear eventId
        setEventId(null);
        setSearchParams({});
      } finally {
        setLoadingEvent(false);
      }
    };

    loadEvent();
  }, [eventId, setSearchParams]);

  // Extract template from query response
  const template = templateData?.data;

  // Save history for undo/redo
  const saveHistory = (canvas: fabric.Canvas) => {
    if (processingRef.current) return;

    const json = JSON.stringify(canvas.toJSON(["id", "selectable"]));

    setHistory((prev) => {
      const currentStep = historyStepRef.current;
      const newHistory = prev.slice(0, currentStep + 1);
      newHistory.push(json);

      // Limit history to 50 steps
      if (newHistory.length > 50) {
        newHistory.shift();
        return newHistory;
      }

      return newHistory;
    });

    setHistoryStep((prev) => {
      const newStep = prev + 1;
      if (newStep >= 50) return 49;
      return newStep;
    });
  };

  // Undo
  const handleUndo = async () => {
    if (!canvas || historyStep <= 0) return;

    processingRef.current = true;
    const prevStep = historyStep - 1;
    const prevState = history[prevStep];

    try {
      await canvas.loadFromJSON(JSON.parse(prevState));

      // Restore object coordinates
      canvas.getObjects().forEach((obj) => {
        obj.setCoords();
      });

      canvas.renderAll();
      setHistoryStep(prevStep);

      // Update selection
      const activeObj = canvas.getActiveObject();
      setSelectedObject(activeObj || null);
    } catch (err) {
      console.error("Undo failed:", err);
    } finally {
      processingRef.current = false;
    }
  };

  // Redo
  const handleRedo = async () => {
    if (!canvas || historyStep >= history.length - 1) return;

    processingRef.current = true;
    const nextStep = historyStep + 1;
    const nextState = history[nextStep];

    try {
      await canvas.loadFromJSON(JSON.parse(nextState));

      // Restore object coordinates
      canvas.getObjects().forEach((obj) => {
        obj.setCoords();
      });

      canvas.renderAll();
      setHistoryStep(nextStep);

      // Update selection
      const activeObj = canvas.getActiveObject();
      setSelectedObject(activeObj || null);
    } catch (err) {
      console.error("Redo failed:", err);
    } finally {
      processingRef.current = false;
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if user is editing text (input, textarea, or contenteditable)
      const target = e.target as HTMLElement;
      const isEditingText =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Check if a text object is in editing mode on the canvas
      const isEditingCanvasText =
        selectedObject?.type === "i-text" && (selectedObject as any).isEditing;

      // Undo: Ctrl+Z
      if (e.ctrlKey && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if (
        (e.ctrlKey && e.key === "y") ||
        (e.ctrlKey && e.shiftKey && e.key === "z")
      ) {
        e.preventDefault();
        handleRedo();
      }
      // Delete: Delete or Backspace - only delete object if NOT editing text
      if (
        (e.key === "Delete" || e.key === "Backspace") &&
        selectedObject &&
        !isEditingText &&
        !isEditingCanvasText
      ) {
        e.preventDefault();
        handleDeleteObject();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObject, historyStep, history]);

  // Canvas ready handler
  const handleCanvasReady = (fabricCanvas: fabric.Canvas) => {
    setCanvas(fabricCanvas);

    // Save initial state to history
    setTimeout(() => {
      saveHistory(fabricCanvas);
    }, 100);
  };

  // Selection change handler
  const handleSelectionChange = (obj: fabric.FabricObject | null) => {
    setSelectedObject(obj);
  };

  // Auto-open properties panel on mobile when object is selected
  useEffect(() => {
    if (selectedObject && window.innerWidth < 768) {
      setIsMobilePropertiesOpen(true);
    } else if (!selectedObject) {
      setIsMobilePropertiesOpen(false);
    }
  }, [selectedObject]);

  // Text update handler
  const handleTextUpdate = (property: keyof ObjectProperties, value: any) => {
    if (!selectedObject || !canvas) return;

    selectedObject.set(property as any, value);
    canvas.renderAll();
    saveHistory(canvas);
  };

  // Delete selected object
  const handleDeleteObject = () => {
    if (!selectedObject || !canvas) return;

    canvas.remove(selectedObject);
    setSelectedObject(null);
    saveHistory(canvas);
  };

  // Get design data for canvas (either from event or template)
  const getDesignData = () => {
    // If we have event data with a saved design, use that
    if (eventData?.customData) {
      return eventData.customData;
    }
    // Otherwise use template design
    return template?.designData;
  };

  // Save design to event
  const handleSaveDesign = async () => {
    if (!canvas) {
      console.error("Cannot save: Canvas not initialized");
      return;
    }

    setIsSaving(true);
    setSaveStatus("saving");

    try {
      const designData = canvas.toJSON(["id", "selectable"]);
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const token = localStorage.getItem("token");

      // Check if user is authenticated
      if (!token) {
        setSaveStatus("error");
        alert(
          "You must be logged in to save designs. Please log in and try again."
        );
        console.error("No authentication token found. User must log in.");
        setIsSaving(false);
        return;
      }

      console.log("Saving design...", {
        eventId,
        templateId,
        hasToken: !!token,
        designData: designData, // Log the actual data
      });

      let response;
      if (eventId) {
        // Update existing event
        console.log(`Updating event ${eventId}`);
        response = await fetch(`${apiUrl}/api/events/${eventId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ customData: designData }),
        });
      } else {
        // Create new event
        console.log("Creating new event");
        response = await fetch(`${apiUrl}/api/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            templateId,
            customData: designData,
            title: template?.name || "Untitled Event",
            status: "draft",
          }),
        });
      }

      const result = await response.json();
      console.log("Save response:", {
        ok: response.ok,
        status: response.status,
        result,
      });

      if (response.ok && result.success) {
        setSaveStatus("saved");
        setLastSavedTime(new Date());
        console.log("Design saved successfully");

        // If this was a new event, update the eventId and URL
        if (!eventId && result.event?._id) {
          const newEventId = result.event._id;
          setEventId(newEventId);
          setEventData(result.event);

          // Update URL with eventId (without triggering reload)
          skipLoadRef.current = true;
          setSearchParams({ eventId: newEventId });
          console.log("New event created with ID:", newEventId);
        }

        // Reset to idle after 2 seconds
        setTimeout(() => {
          setSaveStatus("idle");
        }, 2000);
      } else {
        setSaveStatus("error");

        // Handle 401 Unauthorized specifically
        if (response.status === 401) {
          console.error("Authentication failed - user needs to log in");
          alert(
            "Your session has expired. Please log in again to save your design."
          );
          // Optionally redirect to login
          // window.location.href = '/login';
        } else {
          console.error("Save failed:", {
            status: response.status,
            message: result.message,
            error: result.error,
          });
          alert(`Save failed: ${result.message || "Unknown error"}`);
        }
      }
    } catch (err) {
      setSaveStatus("error");
      console.error("Save error:", err);
      alert(
        `Save error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Loading state
  if (isLoading || loadingEvent) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange mb-4"></div>
          <p className="text-neutral-500">Loading editor...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-brand-mirage mb-2">
            Failed to load template
          </h2>
          <p className="text-neutral-500 mb-6">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <button
            onClick={() => navigate("/templates")}
            className="px-6 py-3 bg-brand-orange text-white rounded-sm hover:bg-brand-orange/90 transition-colors"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  const getSaveButtonContent = () => {
    switch (saveStatus) {
      case "saving":
        return (
          <>
            <svg
              className="animate-spin h-4 w-4 mr-2"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </>
        );
      case "saved":
        return (
          <>
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Saved!
          </>
        );
      case "error":
        return (
          <>
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Error
          </>
        );
      default:
        return "Save Design";
    }
  };

  const getSaveButtonClass = () => {
    const baseClass =
      "px-4 py-2 rounded-sm transition-colors flex items-center";
    switch (saveStatus) {
      case "saved":
        return `${baseClass} bg-brand-black text-white`;
      case "error":
        return `${baseClass} bg-brand-black text-white`;
      default:
        return `${baseClass} bg-brand-black text-white hover:bg-brand-black/90`;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Header - Fixed Height - Responsive */}
      <div className="h-14 md:h-16 bg-white border-b border-gray-100 shrink-0 z-10 relative">
        <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full gap-2">
            {/* Left Side */}
            <div className="flex items-center space-x-2 md:space-x-4 min-w-0">
              <button
                onClick={() => navigate("/templates")}
                className="text-neutral-500 hover:text-brand-black transition-colors shrink-0 p-1"
                title="Back to Templates"
                aria-label="Back to Templates"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <div className="min-w-0">
                  <h1 className="text-sm md:text-xl font-bold text-brand-black truncate">
                    {template?.name || "Editor"}
                  </h1>
                  <p className="hidden md:block text-xs text-neutral-500 capitalize">
                    {template?.category} template
                  </p>
                </div>
                {/* Auto-save indicator - Hidden on small mobile */}
                <div className="hidden sm:block">
                  <AutoSaveIndicator
                    status={saveStatus}
                    lastSavedTime={lastSavedTime}
                  />
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 md:space-x-3 shrink-0">
              {/* Selection indicator - Hidden on mobile */}
              {selectedObject && (
                <span className="hidden md:inline-flex text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  Object Selected
                </span>
              )}
              {/* Save button - Compact on mobile */}
              <button
                className={getSaveButtonClass()}
                onClick={handleSaveDesign}
                disabled={isSaving}
              >
                <span className="hidden md:inline">
                  {getSaveButtonContent()}
                </span>
                <span className="md:hidden">{isSaving ? "..." : "Save"}</span>
              </button>
              {/* Next button - Hidden on mobile, only show when event is saved */}
              {eventId && saveStatus !== "saving" && (
                <button
                  onClick={() => navigate(`/event/details/${eventId}`)}
                  className="hidden md:flex px-4 py-2 bg-brand-black text-white rounded-sm hover:bg-brand-black/90 transition-colors items-center"
                >
                  Next: Event Details
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout - Full screen flex */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Module Selector and Content - Hidden on mobile */}
        <div className="hidden md:flex w-80 bg-[#1e1e1e] border-r border-[#333] flex-col z-10 shrink-0 h-full overflow-y-auto custom-scrollbar text-white">
          <div className="p-4 space-y-6">
            {/* Module Selector */}
            <EditorModuleSelector
              activeModule={activeModule}
              onModuleChange={setActiveModule}
            />

            <div className="h-px bg-gray-700"></div>

            {/* Module Content */}
            <div className="min-h-[400px]">
              {activeModule === "text" && (
                <TextModule
                  canvas={canvas}
                  onTextAdded={() => {
                    if (canvas) saveHistory(canvas);
                  }}
                />
              )}

              {activeModule === "images" && (
                <ImageUploader
                  canvas={canvas}
                  onImageAdded={() => {
                    if (canvas) saveHistory(canvas);
                  }}
                />
              )}

              {activeModule === "background" && (
                <BackgroundModule
                  canvas={canvas}
                  onBackgroundChanged={() => {
                    if (canvas) saveHistory(canvas);
                  }}
                />
              )}

              {activeModule === "stickers" && (
                <StickersModule
                  canvas={canvas}
                  onStickerAdded={() => {
                    if (canvas) saveHistory(canvas);
                  }}
                />
              )}

              {activeModule === "layers" && (
                <LayersModule
                  canvas={canvas}
                  onLayerChange={() => {
                    if (canvas) saveHistory(canvas);
                  }}
                />
              )}

              {activeModule === "effects" && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Premium Effects
                  </h4>
                  <p className="text-sm text-gray-400 mb-4">
                    Unlock animations, shadows, and special effects
                  </p>
                  <button className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-sm hover:shadow-lg transition-all">
                    Upgrade to Premium
                  </button>
                </div>
              )}
            </div>

            <div className="h-px bg-gray-700"></div>

            {/* Undo/Redo Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleUndo}
                disabled={historyStep <= 0}
                className={`flex items-center justify-center py-2 px-3 text-sm font-medium rounded-sm transition-all ${
                  historyStep <= 0
                    ? "bg-white/5 text-gray-600 cursor-not-allowed"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
                title="Undo (Ctrl+Z)"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Undo
              </button>
              <button
                onClick={handleRedo}
                disabled={historyStep >= history.length - 1}
                className={`flex items-center justify-center py-2 px-3 text-sm font-medium rounded-sm transition-all ${
                  historyStep >= history.length - 1
                    ? "bg-white/5 text-gray-600 cursor-not-allowed"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
                title="Redo (Ctrl+Y)"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
                  />
                </svg>
                Redo
              </button>
            </div>

            {/* Delete Button */}
            {selectedObject && (
              <>
                <div className="h-px bg-gray-700"></div>
                <button
                  onClick={handleDeleteObject}
                  className="flex items-center justify-center py-2 px-3 text-sm font-medium rounded-sm transition-all bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                  title="Delete (Del)"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Delete Object
                </button>
              </>
            )}
          </div>
        </div>

        {/* Center Canvas Area - Optimized for both mobile and desktop */}
        <div className="flex-1 bg-brand-cream relative overflow-hidden flex flex-col items-center justify-center p-1 md:p-4 pb-20 md:pb-4 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="relative shadow-2xl rounded-sm overflow-hidden bg-white ring-1 ring-black/5">
            <FabricCanvas
              designData={getDesignData()}
              onCanvasReady={handleCanvasReady}
              onSelectionChange={handleSelectionChange}
            />
          </div>
        </div>

        {/* Right Sidebar - Properties - Hidden on mobile */}
        <div className="hidden md:flex w-80 bg-[#1e1e1e] border-l border-[#333] flex-col z-2 shrink-0 h-full overflow-y-auto custom-scrollbar text-white">
          <div className="p-4 space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Properties
            </h3>

            {/* Text Toolbar - shows when text is selected */}
            {selectedObject && selectedObject.type === "i-text" && (
              <TextToolbar
                selectedObject={selectedObject}
                onUpdate={handleTextUpdate}
              />
            )}

            <ColorPicker
              selectedObject={selectedObject}
              onUpdate={handleTextUpdate}
            />

            {!selectedObject && (
              <div className="text-center py-10">
                <div className="bg-gray-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-8 h-8 text-gray-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-400">
                  Select an item to edit its properties
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Toolbar - Only visible on mobile */}
      <MobileBottomToolbar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSaveDesign}
        onOpenModules={() => setIsMobileModulesOpen(true)}
        canUndo={historyStep > 0}
        canRedo={historyStep < history.length - 1}
        isSaving={isSaving}
      />

      {/* Mobile Modules Drawer */}
      <MobileModulesDrawer
        isOpen={isMobileModulesOpen}
        onClose={() => setIsMobileModulesOpen(false)}
        activeModule={activeModule}
        onModuleChange={(module) => {
          setActiveModule(module);
        }}
      >
        {/* Render active module content */}
        {activeModule === "text" && (
          <TextModule
            canvas={canvas}
            onTextAdded={() => {
              if (canvas) saveHistory(canvas);
            }}
          />
        )}
        {activeModule === "images" && (
          <ImageUploader
            canvas={canvas}
            onImageAdded={() => {
              if (canvas) saveHistory(canvas);
            }}
          />
        )}
        {activeModule === "background" && (
          <BackgroundModule
            canvas={canvas}
            onBackgroundChanged={() => {
              if (canvas) saveHistory(canvas);
            }}
          />
        )}
        {activeModule === "stickers" && (
          <StickersModule
            canvas={canvas}
            onStickerAdded={() => {
              if (canvas) saveHistory(canvas);
            }}
          />
        )}
        {activeModule === "layers" && (
          <LayersModule
            canvas={canvas}
            onLayerChange={() => {
              if (canvas) saveHistory(canvas);
            }}
          />
        )}
      </MobileModulesDrawer>

      {/* Mobile Properties Panel */}
      <MobilePropertiesPanel
        isOpen={isMobilePropertiesOpen}
        onClose={() => setIsMobilePropertiesOpen(false)}
        onDelete={selectedObject ? handleDeleteObject : undefined}
      >
        {/* Text Toolbar - shows when text is selected */}
        {selectedObject && selectedObject.type === "i-text" && (
          <TextToolbar
            selectedObject={selectedObject}
            onUpdate={handleTextUpdate}
          />
        )}

        <ColorPicker
          selectedObject={selectedObject}
          onUpdate={handleTextUpdate}
        />

        {!selectedObject && (
          <div className="text-center py-10">
            <p className="text-sm text-gray-400">
              Select an item to edit its properties
            </p>
          </div>
        )}
      </MobilePropertiesPanel>
    </div>
  );
};
