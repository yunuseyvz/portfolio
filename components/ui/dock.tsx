"use client";

import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";

export interface DockProps extends VariantProps<typeof dockVariants> {
  className?: string;
  magnification?: number;
  distance?: number;
  children: React.ReactNode;
}

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "mx-auto w-max h-full p-2 flex items-end rounded-full border"
);

// Magnification state is shared via context so the Dock doesn't need to clone
// props into its children. That avoids leaking invalid DOM attributes onto
// non-icon children (e.g. <Separator/>), which previously broke hydration.
interface DockContextValue {
  mousex: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextValue | null>(null);

const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      ...props
    },
    ref
  ) => {
    const mousex = useMotionValue(Infinity);

    return (
      <DockContext.Provider value={{ mousex, magnification, distance }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mousex.set(e.pageX)}
          onMouseLeave={() => mousex.set(Infinity)}
          {...props}
          className={cn(dockVariants({ className }))}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  }
);

Dock.displayName = "Dock";

export interface DockIconProps {
  size?: number;
  className?: string;
  children?: React.ReactNode;
}

const DockIcon = ({ size, className, children }: DockIconProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const ctx = useContext(DockContext);

  // Defer the magnification animation until after mount. The animated width
  // (a framer-motion spring) is not deterministic between SSR and the first
  // client render, so we render a plain fixed width first, then enable the
  // spring. This keeps the hydrated DOM identical to the server output.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fallback so the icon still works if rendered outside a <Dock>.
  const fallbackMouse = useMotionValue(Infinity);
  const mousex = ctx?.mousex ?? fallbackMouse;
  const magnification = ctx?.magnification ?? DEFAULT_MAGNIFICATION;
  const distance = ctx?.distance ?? DEFAULT_DISTANCE;

  const distanceCalc = useTransform(mousex, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [40, magnification, 40]
  );

  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={mounted ? { width } : undefined}
      className={cn(
        "flex aspect-square w-10 cursor-pointer items-center justify-center rounded-full",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
