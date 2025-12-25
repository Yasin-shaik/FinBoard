"use client";

import { useMemo, useEffect, useState, useRef } from "react";
import { Responsive } from "react-grid-layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateLayout, removeWidget } from "@/store/dashboardSlice";
import SmartWidget from './SmartWidget';

// Hook to measure container width
function useContainerWidth() {
  const [width, setWidth] = useState(1200);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return { width, containerRef: ref };
}

export default function WidgetGrid() {
  const dispatch = useAppDispatch();
  const { widgets } = useAppSelector((state) => state.dashboard);
  const [mounted, setMounted] = useState(false);
  const { width, containerRef } = useContainerWidth();

  useEffect(() => {
    setMounted(true);
  }, []);

  // --- KEY CHANGE 1: Update Layout Logic ---
  // In a 3-column grid, a width of '1' is one-third of the screen.
  const baseLayout = useMemo(
    () =>
      widgets.map((widget) => ({
        i: widget.id,
        x: widget.position.x,
        y: widget.position.y,
        // Ensure width doesn't exceed 3 (full width)
        w: Math.min(widget.position.w, 3), 
        h: widget.position.h,
        minW: 1, // Minimum width is 1 column
        minH: 2,
      })),
    [widgets]
  );

  const layouts = useMemo(
    () => ({
      lg: baseLayout,
      md: baseLayout,
      sm: baseLayout,
      xs: baseLayout,
      xxs: baseLayout,
    }),
    [baseLayout]
  );

  const handleLayoutChange = (layout: any) => {
    dispatch(updateLayout(layout));
  };

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="w-full">
      <Responsive
        className="layout"
        width={width}
        layouts={layouts}
        // --- KEY CHANGE 2: Define Columns ---
        // We set 'lg' (desktop) to 3 columns.
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100} // Increased height slightly for better vertical proportions
        margin={[16, 16]}
        onDragStop={handleLayoutChange}
        onResizeStop={handleLayoutChange}
        isDraggable
        isResizable
        compactType="vertical"
        {...({ draggableHandle: ".drag-handle" } as any)}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <SmartWidget widget={widget} />
          </div>
        ))}
      </Responsive>
    </div>
  );
}