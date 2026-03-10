import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function Hero3D({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const lightX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const lightY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden bg-[#0B0D14]"
    >

      {/* dynamic spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [lightX, lightY],
            ([x, y]) =>
              `radial-gradient(circle at ${x} ${y}, rgba(197,155,118,0.18), transparent 40%)`
          ),
        }}
      />

      {/* subtle gradient movement */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(197,155,118,0.12), transparent 60%)",
          x: useTransform(smoothX, [0, 1], [-40, 40]),
          y: useTransform(smoothY, [0, 1], [-40, 40]),
        }}
      />

      {/* perspective grid */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          transform: "perspective(900px) rotateX(60deg) scale(2)",
          backgroundImage:
            "linear-gradient(rgba(197,155,118,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(197,155,118,0.15) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          x: useTransform(smoothX, [0, 1], [-20, 20]),
          y: useTransform(smoothY, [0, 1], [-20, 20]),
        }}
      />

      {/* floating glow */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          x: useTransform(smoothX, [0, 1], [-40, 40]),
          y: useTransform(smoothY, [0, 1], [-40, 40]),
        }}
        className="absolute left-1/2 top-1/2 w-[520px] h-[520px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-full h-full rounded-full bg-[#c59b76]/30 blur-[140px]" />
      </motion.div>

      {/* orbit ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 opacity-30"
      >
        <div className="w-full h-full rounded-full border border-[#c59b76]/20" />
      </motion.div>

      {/* YOUR UI CONTENT WITH 3D TILT */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="relative z-10 flex items-center justify-center h-full"
      >
        {children}
      </motion.div>

      {/* radial fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, #0B0D14 85%)",
        }}
      />
    </div>
  );
}