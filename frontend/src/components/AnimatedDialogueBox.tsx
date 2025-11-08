import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Volume2, VolumeX, Pause, Play } from "lucide-react";
import { type DialogueLine } from "../pages/scenarioData";
import { useTextToSpeech } from "../hooks/useTextToSpeech";

interface AnimatedDialogueBoxProps {
  dialogue: DialogueLine;
  onNext?: () => void;
  showNext?: boolean;
  autoPlay?: boolean;
}

const AnimatedDialogueBox: React.FC<AnimatedDialogueBoxProps> = ({
  dialogue,
  onNext,
  showNext = true,
  autoPlay = true,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { speak, stop, pause, resume, isSpeaking, isPaused, getVoiceForCharacter } = useTextToSpeech();
  const [audioEnabled, setAudioEnabled] = useState(true);

  // Typing animation effect
  useEffect(() => {
    if (!dialogue.text) return;

    setDisplayedText("");
    setIsTyping(true);
    stop(); // Stop any previous speech

    let currentIndex = 0;
    const typingSpeed = 30; // milliseconds per character

    const typeText = () => {
      if (currentIndex < dialogue.text.length) {
        setDisplayedText(dialogue.text.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        setIsTyping(false);
        
        // Auto-play audio after typing completes
        if (autoPlay && audioEnabled && dialogue.character) {
          const voice = getVoiceForCharacter(
            dialogue.character.gender,
            dialogue.character.age
          );
          
          // Adjust speech parameters based on character
          let rate = 0.9;
          let pitch = 1;
          
          if (dialogue.character.age === "elderly") {
            rate = 0.8;
            pitch = 0.9;
          } else if (dialogue.character.age === "young" || dialogue.character.gender === "child") {
            rate = 1.0;
            pitch = 1.2;
          }
          
          speak(dialogue.text, {
            voice,
            rate,
            pitch,
            volume: 1,
          });
        }
      }
    };

    typeText();

    return () => {
      stop();
    };
  }, [dialogue.text, dialogue.character, autoPlay, audioEnabled, speak, stop, getVoiceForCharacter]);

  const handleToggleAudio = () => {
    if (audioEnabled) {
      stop();
      setAudioEnabled(false);
    } else {
      setAudioEnabled(true);
      if (dialogue.character) {
        const voice = getVoiceForCharacter(
          dialogue.character.gender,
          dialogue.character.age
        );
        speak(dialogue.text, { voice });
      }
    }
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dialogue.id}
        className="relative w-full max-w-full mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
      >
        {/* Speaker name - compact */}
        <motion.div
          className="absolute -top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-md shadow-lg tracking-wide font-bold text-sm z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {dialogue.speaker}
        </motion.div>

        {/* Dialogue box - compact */}
        <motion.div
          className="rounded-lg border-2 border-black bg-white/95 p-4 shadow-[0_4px_0_#000] relative"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Audio controls - smaller */}
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleAudio}
              className="h-6 w-6 p-0"
            >
              {audioEnabled ? (
                <Volume2 className="h-3 w-3" />
              ) : (
                <VolumeX className="h-3 w-3" />
              )}
            </Button>
            {isSpeaking && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePauseResume}
                className="h-6 w-6 p-0"
              >
                {isPaused ? (
                  <Play className="h-3 w-3" />
                ) : (
                  <Pause className="h-3 w-3" />
                )}
              </Button>
            )}
          </div>

          {/* Dialogue text - smaller */}
          <motion.p
            className="text-sm leading-relaxed text-gray-800 min-h-[40px] pr-12"
            key={displayedText}
          >
            {displayedText}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1 h-4 bg-gray-800 ml-1"
              />
            )}
          </motion.p>

          {/* Next button - compact */}
          {showNext && !isTyping && (
            <motion.div
              className="mt-3 flex justify-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                className="text-xs px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                onClick={onNext}
                disabled={isTyping}
              >
                Next ▸
              </Button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedDialogueBox;

