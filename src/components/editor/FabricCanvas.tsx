import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

interface FabricCanvasProps {
  designData?: object;
  onCanvasReady?: (canvas: fabric.Canvas) => void;
  onSelectionChange?: (activeObject: fabric.FabricObject | null) => void;
  readOnly?: boolean;
}

/**
 * FabricCanvas Component - Responsive with proper text editing
 */
export const FabricCanvas = ({
  designData,
  onCanvasReady,
  onSelectionChange,
  readOnly = false,
}: FabricCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [isReady, setIsReady] = useState(false);

  const onCanvasReadyRef = useRef(onCanvasReady);
  const onSelectionChangeRef = useRef(onSelectionChange);

  useEffect(() => {
    onCanvasReadyRef.current = onCanvasReady;
    onSelectionChangeRef.current = onSelectionChange;
  }, [onCanvasReady, onSelectionChange]);

  // Canvas dimensions - design size
  const BASE_WIDTH = 600;
  const BASE_HEIGHT = 800;

  // Initialize canvas
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container || fabricRef.current) return;

    const canvasEl = document.createElement("canvas");
    wrapper.appendChild(canvasEl);

    const initTimer = setTimeout(() => {
      try {
        const canvas = new fabric.Canvas(canvasEl, {
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          backgroundColor: "#ffffff",
          selection: !readOnly, // Disable selection if readOnly
          preserveObjectStacking: true,
          interactive: !readOnly, // Disable interaction if readOnly
        });

        fabricRef.current = canvas;

        if (!readOnly) {
          // Selection handlers only if not readOnly
          canvas.on("selection:created", (e) => {
            onSelectionChangeRef.current?.(e.selected?.[0] || null);
          });
          canvas.on("selection:updated", (e) => {
            onSelectionChangeRef.current?.(e.selected?.[0] || null);
          });
          canvas.on("selection:cleared", () => {
            onSelectionChangeRef.current?.(null);
          });

          // Object modification handlers
          canvas.on("object:modified", () => {
            canvas.requestRenderAll();
          });
        }

        // Scale canvas to fit container - optimized for both mobile and desktop
        const resizeCanvas = () => {
          if (!container) return;

          const containerWidth = container.clientWidth;
          const containerHeight = container.clientHeight;
          const screenWidth = window.innerWidth;

          let scale: number;

          if (screenWidth < 768) {
            // MOBILE: Canvas width should be 85% of viewport width
            const targetWidth = screenWidth * 0.85;
            scale = targetWidth / BASE_WIDTH;
          } else if (screenWidth < 1280) {
            // Tablet/Small laptop: Moderate scaling
            const padding = 24;
            const availableWidth = containerWidth - padding * 2;
            const availableHeight = containerHeight - padding * 2;
            const scaleX = availableWidth / BASE_WIDTH;
            const scaleY = availableHeight / BASE_HEIGHT;
            scale = Math.min(scaleX, scaleY, 1.5);
          } else {
            // Large desktop: Fill the available space well
            const padding = 32;
            const availableWidth = containerWidth - padding * 2;
            const availableHeight = containerHeight - padding * 2;
            const scaleX = availableWidth / BASE_WIDTH;
            const scaleY = availableHeight / BASE_HEIGHT;
            scale = Math.min(scaleX, scaleY, 2.0);
          }

          const width = Math.round(BASE_WIDTH * scale);
          const height = Math.round(BASE_HEIGHT * scale);

          // Update wrapper size
          wrapper.style.width = `${width}px`;
          wrapper.style.height = `${height}px`;

          // Set canvas dimensions and zoom
          canvas.setDimensions({ width, height });
          canvas.setZoom(scale);
          canvas.requestRenderAll();
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        setIsReady(true);
        onCanvasReadyRef.current?.(canvas);
      } catch (err) {
        console.error("Failed to initialize Fabric canvas:", err);
      }
    }, 100);

    return () => {
      clearTimeout(initTimer);
      if (fabricRef.current) {
        fabricRef.current.dispose();
        fabricRef.current = null;
      }
      while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.firstChild);
      }
      setIsReady(false);
    };
  }, [readOnly]);

  // Load design data
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!designData || !isReady || !fabricRef.current || loadedRef.current) {
      return;
    }

    loadedRef.current = true;
    const canvas = fabricRef.current;

    canvas
      .loadFromJSON(designData)
      .then(() => {
        canvas.getObjects().forEach((obj) => {
          obj.setCoords();
          if (readOnly) {
            // Make objects unselectable and immutable
            obj.set({
              selectable: false,
              evented: false,
              lockMovementX: true,
              lockMovementY: true,
              lockRotation: true,
              lockScalingX: true,
              lockScalingY: true,
              hasControls: false,
              hasBorders: false,
              hoverCursor: "default",
            });
          }
        });
        canvas.requestRenderAll();
      })
      .catch((err: Error) => {
        console.error("Failed to load design data:", err);
      });
  }, [designData, isReady, readOnly]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden"
    >
      {!isReady && (
        <div className="absolute flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
        </div>
      )}

      <div ref={wrapperRef} className="bg-white shadow-xl" />
    </div>
  );
};
