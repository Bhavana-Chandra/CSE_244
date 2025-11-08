import React from "react";
import { motion } from "framer-motion";
import { type Character } from "../pages/scenarioData";
import ManPortrait from "../assets/man.svg";
import PolicePortrait from "../assets/police.svg";
import PeoplePortrait from "../assets/people.svg";
import ChildPortrait from "../assets/child.jpg";
import FarmerPortrait from "../assets/farmer.png";
import NeutralPortrait from "../assets/neutral.png";
import OfficialPortrait from "../assets/official.png";
import ParentsPortrait from "../assets/parents.png";

interface AnimatedCharacterProps {
  character: Character;
  isSpeaking: boolean;
  position: "left" | "right" | "center";
  side?: "left" | "right";
}

const AnimatedCharacter: React.FC<AnimatedCharacterProps> = ({
  character,
  isSpeaking,
  position,
  side = "left",
}) => {
  // Get character portrait based on role and gender
  const getPortrait = () => {
    const roleLower = character.role.toLowerCase();
    const nameLower = character.name.toLowerCase();
    
    // Child characters - highest priority
    if (character.gender === "child" || character.age === "young" || 
        roleLower.includes("student") || roleLower.includes("child") ||
        nameLower.includes("child") || nameLower.includes("young")) {
      return ChildPortrait;
    }
    
    // Parents
    if (roleLower.includes("parent") || roleLower.includes("mother") || 
        roleLower.includes("father") || nameLower.includes("parent")) {
      return ParentsPortrait;
    }
    
    // Officials/Administrators
    if (roleLower.includes("official") || roleLower.includes("administrator") ||
        roleLower.includes("government") || roleLower.includes("school official") ||
        nameLower.includes("official") || nameLower.includes("administrator")) {
      return OfficialPortrait;
    }
    
    // Farmers
    if (roleLower.includes("farmer") || roleLower.includes("farm") ||
        nameLower.includes("farmer")) {
      return FarmerPortrait;
    }
    
    // Police/Law enforcement
    if (roleLower.includes("police") || roleLower.includes("law enforcement") || 
        roleLower.includes("officer") || nameLower.includes("police") ||
        nameLower.includes("police officer")) {
      return PolicePortrait;
    }
    
    // Neutral characters (citizens, villagers, job applicants, community leaders, etc.)
    if (roleLower.includes("citizen") || roleLower.includes("villager") ||
        roleLower.includes("community") || roleLower.includes("people") ||
        roleLower.includes("job applicant") || roleLower.includes("applicant") ||
        roleLower.includes("community leader") || roleLower.includes("leader") ||
        character.emotion === "neutral" || nameLower.includes("villager")) {
      return NeutralPortrait;
    }
    
    // Female characters
    if (character.gender === "female") {
      // Use parents image as it might contain female representation
      // or fallback to neutral
      return ParentsPortrait;
    }
    
    // Default to neutral or man portrait
    return NeutralPortrait || ManPortrait;
  };
  
  // Get character color based on role and emotion
  const getCharacterColor = () => {
    const roleLower = character.role.toLowerCase();
    
    if (roleLower.includes("police") || roleLower.includes("law enforcement")) {
      return "bg-red-500";
    }
    if (roleLower.includes("parent") || roleLower.includes("mother") || roleLower.includes("father")) {
      return "bg-blue-500";
    }
    if (roleLower.includes("official") || roleLower.includes("administrator")) {
      return "bg-gray-600";
    }
    if (roleLower.includes("citizen") || roleLower.includes("farmer")) {
      return "bg-green-600";
    }
    if (character.emotion === "angry") {
      return "bg-red-600";
    }
    if (character.emotion === "sad") {
      return "bg-blue-600";
    }
    if (character.emotion === "happy") {
      return "bg-yellow-500";
    }
    return "bg-purple-500";
  };

  // Animation variants based on emotion
  const getEmotionVariants = () => {
    // Subtle zoom when speaking - enough to be noticeable but won't crop
    const base = {
      scale: isSpeaking ? 1.08 : 1,
      opacity: isSpeaking ? 1 : 0.7,
    };

    switch (character.emotion) {
      case "angry":
        return {
          ...base,
          rotate: isSpeaking ? [-2, 2, -2, 2, 0] : 0,
          transition: {
            rotate: {
              repeat: isSpeaking ? Infinity : 0,
              duration: 0.5,
              ease: "easeInOut",
            },
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 },
          },
        };
      case "sad":
        return {
          ...base,
          y: isSpeaking ? [0, -5, 0] : 0,
          transition: {
            y: {
              repeat: isSpeaking ? Infinity : 0,
              duration: 1.5,
              ease: "easeInOut",
            },
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 },
          },
        };
      case "worried":
        return {
          ...base,
          x: isSpeaking ? [0, 3, -3, 0] : 0,
          transition: {
            x: {
              repeat: isSpeaking ? Infinity : 0,
              duration: 1,
              ease: "easeInOut",
            },
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 },
          },
        };
      case "happy":
        return {
          ...base,
          y: isSpeaking ? [0, -10, 0] : 0,
          transition: {
            y: {
              repeat: isSpeaking ? Infinity : 0,
              duration: 0.6,
              ease: "easeInOut",
            },
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 },
          },
        };
      default:
        return {
          ...base,
          y: isSpeaking ? [0, -5, 0] : 0,
          transition: {
            y: {
              repeat: isSpeaking ? Infinity : 0,
              duration: 1,
              ease: "easeInOut",
            },
            scale: { duration: 0.3 },
            opacity: { duration: 0.3 },
          },
        };
    }
  };

  // Responsive size based on age, role, and number of characters
  // Uses viewport-relative units for responsive scaling
  const getSize = () => {
    const roleLower = character.role.toLowerCase();
    
    // Base sizes using viewport units for responsiveness
    // Children are smaller
    if (character.age === "young" || character.gender === "child" ||
        roleLower.includes("child") || roleLower.includes("student")) {
      return { 
        width: "clamp(100px, 15vw, 140px)", 
        height: "clamp(140px, 20vh, 180px)",
        maxWidth: "140px",
        maxHeight: "180px"
      };
    }
    
    // Elderly are slightly smaller
    if (character.age === "elderly") {
      return { 
        width: "clamp(110px, 16vw, 150px)", 
        height: "clamp(150px, 22vh, 200px)",
        maxWidth: "150px",
        maxHeight: "200px"
      };
    }
    
    // Parents might be slightly larger
    if (roleLower.includes("parent")) {
      return { 
        width: "clamp(120px, 17vw, 160px)", 
        height: "clamp(160px, 24vh, 220px)",
        maxWidth: "160px",
        maxHeight: "220px"
      };
    }
    
    // Default adult size - responsive for TV
    return { 
      width: "clamp(110px, 16vw, 150px)", 
      height: "clamp(150px, 22vh, 200px)",
      maxWidth: "150px",
      maxHeight: "200px"
    };
  };

  const size = getSize();
  const variants = getEmotionVariants();

  return (
    <motion.div
      className="relative flex flex-col items-center justify-end"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{
        opacity: variants.opacity,
        y: 0,
        scale: variants.scale,
        rotate: variants.rotate,
        x: variants.x,
      }}
      transition={variants.transition}
      style={{
        width: size.width,
        minWidth: "100px",
        maxWidth: size.maxWidth,
        height: "auto",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        position: "relative",
      }}
    >
      {/* Speaking indicator - positioned above character */}
      {isSpeaking && (
        <motion.div
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <div className="bg-yellow-400 rounded-full p-1.5 shadow-lg">
            <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
          </div>
        </motion.div>
      )}

      {/* Character image container - ensures full visibility with proper sizing */}
      <motion.div
        className="relative w-full flex items-end justify-center"
        style={{
          height: size.height,
          minHeight: size.height,
          maxHeight: size.maxHeight,
          width: "100%",
        }}
        animate={{
          scale: isSpeaking ? 1.05 : 1,
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <img
          src={getPortrait()}
          alt={character.name}
          className="w-auto h-full max-w-full object-contain drop-shadow-2xl transition-all duration-300"
          style={{
            filter: isSpeaking
              ? "drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)) contrast(1.05) brightness(1.05)"
              : "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.4)) brightness(0.95)",
            objectPosition: "bottom center",
            height: "100%",
            width: "auto",
            maxWidth: "100%",
          }}
          onError={(e) => {
            // Fallback to colored div if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent && !parent.querySelector(".fallback-character")) {
              const fallback = document.createElement("div");
              fallback.className = `fallback-character w-full h-full ${getCharacterColor()} rounded-lg flex items-center justify-center text-white text-2xl font-bold`;
              fallback.textContent = character.name.charAt(0).toUpperCase();
              parent.appendChild(fallback);
            }
          }}
        />
      </motion.div>

      {/* Character name label - positioned below character */}
      {isSpeaking && (
        <motion.div
          className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-white text-xs font-bold bg-black/90 px-2 py-1 rounded whitespace-nowrap shadow-lg z-10"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {character.name}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedCharacter;

