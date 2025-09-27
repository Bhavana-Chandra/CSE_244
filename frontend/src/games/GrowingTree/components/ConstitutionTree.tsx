import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  unlocked: number; // number of stages unlocked (0-10)
  finalCelebration?: boolean;
}

const grow = {
  hidden: { opacity: 0, scale: 0.2 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } }
};

const ConstitutionTree: React.FC<Props> = ({ unlocked, finalCelebration }) => {
  // Ten layers corresponding to stages
  const layers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="w-full aspect-square flex items-center justify-center">
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Background subtle vignette */}
        <defs>
          <radialGradient id="vignette" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width="400" height="400" fill="url(#vignette)" />

        {/* Ground */}
        <motion.ellipse cx="200" cy="340" rx="140" ry="18" fill="#a3b18a" initial="hidden" animate={unlocked > 0 ? 'visible' : 'hidden'} variants={grow} />

        {/* Seed (stage 1) */}
        <motion.circle cx="200" cy="320" r="6" fill="#6b4f1d" initial="hidden" animate={unlocked >= 1 ? 'visible' : 'hidden'} variants={grow} />

        {/* Sprout (stage 2) */}
        <motion.path d="M200 320 C202 305, 202 300, 200 290" stroke="#2a9d8f" strokeWidth="4" fill="none" strokeLinecap="round" initial="hidden" animate={unlocked >= 2 ? 'visible' : 'hidden'} variants={grow} />

        {/* Small branches (stages 3,4,5) */}
        <motion.path d="M200 292 C190 280, 175 270, 165 260" stroke="#2a9d8f" strokeWidth="5" fill="none" strokeLinecap="round" initial="hidden" animate={unlocked >= 3 ? 'visible' : 'hidden'} variants={grow} />
        <motion.path d="M200 292 C210 280, 225 270, 235 260" stroke="#2a9d8f" strokeWidth="5" fill="none" strokeLinecap="round" initial="hidden" animate={unlocked >= 4 ? 'visible' : 'hidden'} variants={grow} />
        <motion.path d="M200 285 C200 270, 200 255, 200 240" stroke="#2a9d8f" strokeWidth="6" fill="none" strokeLinecap="round" initial="hidden" animate={unlocked >= 5 ? 'visible' : 'hidden'} variants={grow} />

        {/* Major branches (stages 6,7,8) */}
        <motion.path d="M200 255 C175 235, 150 220, 135 205" stroke="#386641" strokeWidth="7" fill="none" strokeLinecap="round" initial="hidden" animate={unlocked >= 6 ? 'visible' : 'hidden'} variants={grow} />
        <motion.path d="M200 250 C225 230, 250 215, 265 200" stroke="#386641" strokeWidth="7" fill="none" strokeLinecap="round" initial="hidden" animate={unlocked >= 7 ? 'visible' : 'hidden'} variants={grow} />
        <motion.path d="M200 240 C200 220, 200 200, 200 185" stroke="#386641" strokeWidth="8" fill="none" strokeLinecap="round" initial="hidden" animate={unlocked >= 8 ? 'visible' : 'hidden'} variants={grow} />

        {/* Leaves cluster (stage 9) */}
        <motion.g initial="hidden" animate={unlocked >= 9 ? 'visible' : 'hidden'} variants={grow}>
          <circle cx="135" cy="200" r="12" fill="#52b788" />
          <circle cx="145" cy="190" r="10" fill="#52b788" />
          <circle cx="255" cy="200" r="12" fill="#52b788" />
          <circle cx="245" cy="190" r="10" fill="#52b788" />
          <circle cx="200" cy="180" r="14" fill="#52b788" />
        </motion.g>

        {/* Blossoms + Ashoka glow (stage 10) */}
        <motion.g initial="hidden" animate={unlocked >= 10 ? 'visible' : 'hidden'} variants={grow}>
          <circle cx="200" cy="160" r="10" fill="#ffcad4" />
          <circle cx="220" cy="175" r="8" fill="#ffd6a5" />
          <circle cx="180" cy="175" r="8" fill="#caf0f8" />
          {/* Ashoka Chakra glow */}
          <circle cx="200" cy="150" r="22" fill="none" stroke="#000080" strokeWidth="2" filter="url(#glow)" />
        </motion.g>
      </svg>
    </div>
  );
};

export default ConstitutionTree;
