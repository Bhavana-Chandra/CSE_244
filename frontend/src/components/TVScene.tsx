import React from "react";
import { motion } from "framer-motion";

interface TVSceneProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

const TVScene: React.FC<TVSceneProps> = ({ children, backgroundImage }) => {
  return (
    <div className="relative w-full max-w-7xl mx-auto mb-8">
      {/* TV Frame - Responsive padding */}
      <div 
        className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl shadow-2xl border-4 border-gray-700"
        style={{
          padding: "clamp(12px, 2vw, 24px)",
        }}
      >
        {/* TV Screen Glow Effect */}
        <div className="absolute inset-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl pointer-events-none" />
        
        {/* Screen Border/Bezel */}
        <div 
          className="relative bg-black rounded-xl border-2 border-gray-600 shadow-inner"
          style={{
            padding: "clamp(8px, 1.5vw, 16px)",
          }}
        >
          {/* Screen Content Area - Responsive height */}
          <div 
            className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-lg overflow-hidden border border-gray-700"
            style={{
              minHeight: "clamp(500px, 70vh, 650px)",
            }}
          >
            {/* Background */}
            {backgroundImage ? (
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/40" />
              </div>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-indigo-900/40">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-black/30" />
              </div>
            )}

            {/* Scan Lines Effect (TV-like) */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div
                className="h-full w-full"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(255, 255, 255, 0.03) 2px,
                    rgba(255, 255, 255, 0.03) 4px
                  )`,
                }}
              />
            </div>

            {/* Vignette Effect */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50 pointer-events-none" />

            {/* Content - Responsive container */}
            <div 
              className="relative z-10 h-full w-full"
              style={{
                minHeight: "clamp(500px, 70vh, 650px)",
              }}
            >
              {children}
            </div>
          </div>
        </div>

        {/* TV Controls/Decorative Elements */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 mt-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-yellow-500 rounded-full" />
          <div className="w-2 h-2 bg-green-500 rounded-full" />
        </div>

        {/* TV Brand/Logo Area */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-gray-400 text-xs font-bold tracking-widest">
          SAMVIDHAN TV
        </div>

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-2 border-gray-600 rounded-tl-lg border-r-0 border-b-0" />
        <div className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-600 rounded-tr-lg border-l-0 border-b-0" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-gray-600 rounded-bl-lg border-r-0 border-t-0" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-gray-600 rounded-br-lg border-l-0 border-t-0" />
      </div>

      {/* Stand/Base */}
      <div className="flex justify-center mt-4">
        <div className="w-32 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg shadow-lg" />
      </div>
    </div>
  );
};

export default TVScene;

