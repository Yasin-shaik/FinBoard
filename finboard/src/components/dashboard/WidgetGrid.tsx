"use client";

import { useMemo, useEffect, useState, useRef, useCallback } from "react";
import { Responsive } from "react-grid-layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateLayout } from "@/store/dashboardSlice";
import SmartWidget from './SmartWidget';
import { Widget } from "@/types";

interface WidgetGridProps {
  onEditWidget: (widget: Widget) => void;
}

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

export default function WidgetGrid({ onEditWidget }: WidgetGridProps) {
  const dispatch = useAppDispatch();
  const { widgets } = useAppSelector((state) => state.dashboard);
  const [mounted, setMounted] = useState(false);
  const { width, containerRef } = useContainerWidth();
  useEffect(() => {
    setMounted(true);
  }, []);
  const baseLayout = useMemo(
    () =>
      widgets.map((widget) => ({
        i: widget.id,
        x: widget.position.x,
        y: widget.position.y,
        w: Math.min(widget.position.w, 3), 
        h: widget.position.h,
        minW: 1,
        minH: 2,
      })),
    [widgets]
  );
  const mobileLayout = useMemo(() => {
    return widgets.map((widget) => ({
      i: widget.id,
      x: 0,
      y: 0,
      w: 1,
      h: widget.position.h,
    }));
  }, [widgets]);
  const layouts = useMemo(
    () => ({
      lg: baseLayout,
      md: baseLayout,
      sm: baseLayout,
      xs: mobileLayout,
      xxs: mobileLayout,
    }),
    [baseLayout, mobileLayout]
  );
  const handleLayoutChange = useCallback((currentLayout: any[]) => {
    const newPositions = currentLayout.map(item => ({
        i: item.i, x: item.x, y: item.y, w: item.w, h: item.h
    }));
    let hasChanged = false;
    for (const newItem of newPositions) {
        const oldItem = widgets.find(w => w.id === newItem.i);
        if (oldItem) {
            if (oldItem.position.x !== newItem.x || 
                oldItem.position.y !== newItem.y || 
                oldItem.position.w !== newItem.w || 
                oldItem.position.h !== newItem.h) {
                hasChanged = true;
                break;
            }
        }
    }
    if (hasChanged) {
        dispatch(updateLayout(currentLayout));
    }
  }, [widgets, dispatch]);
  if (!mounted) return null;
  const isMobile = width < 768;
  return (
    <div ref={containerRef} className="w-full">
      <Responsive
        className="layout"
        width={width}
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100}
        margin={[16, 16]}
        // Use the guarded handler
        onDragStop={handleLayoutChange} 
        onResizeStop={handleLayoutChange}
        isDraggable={!isMobile} 
        isResizable={!isMobile}
        compactType="vertical"
        {...({ draggableHandle: ".drag-handle" } as any)}
      >
        {widgets.map((widget) => (
          <div key={widget.id}>
            <SmartWidget widget={widget} onEdit={onEditWidget} />
          </div>
        ))}
      </Responsive>
    </div>
  );
}