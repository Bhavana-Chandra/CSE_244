import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { scenarios, type Scenario, type DialogueLine, type Choice } from "./scenarioData";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import AnimatedCharacter from "../components/AnimatedCharacter";
import AnimatedDialogueBox from "../components/AnimatedDialogueBox";
import TVScene from "../components/TVScene";
import BgScene from "../assets/parliament-building.jpg";
import { motion, AnimatePresence } from "framer-motion";

const ScenarioDetail: React.FC = () => {
  const { id } = useParams();
  const scenario: Scenario | undefined = scenarios.find((s) => s.id === id);
  const [selectedChoice, setSelectedChoice] = React.useState<Choice | null>(null);
  const [phase, setPhase] = React.useState<"intro" | "dialogue" | "choices" | "outcome">("intro");
  const [dialogueIndex, setDialogueIndex] = React.useState<number>(-1);

  // Get all unique characters from the scenario with their positions
  const characters = useMemo(() => {
    if (!scenario) return [];
    
    const characterMap = new Map<string, { character: any; dialogueIndex: number }>();
    
    // Collect unique characters with their first appearance index
    scenario.scene.dialogue.forEach((dialogue, index) => {
      if (dialogue.character) {
        const key = dialogue.speaker;
        if (!characterMap.has(key)) {
          characterMap.set(key, {
            character: dialogue.character,
            dialogueIndex: index,
          });
        }
      }
    });
    
    // Convert to array and assign positions
    const uniqueCharacters = Array.from(characterMap.entries());
    const total = uniqueCharacters.length;
    
    return uniqueCharacters.map(([speaker, data], index) => {
      let position: "left" | "right" | "center" = "left";
      
      if (total === 1) {
        position = "center";
      } else if (total === 2) {
        position = index === 0 ? "left" : "right";
      } else if (total === 3) {
        position = index === 0 ? "left" : index === 1 ? "right" : "center";
      } else {
        // For 4+ characters, distribute them
        if (index === 0) position = "left";
        else if (index === total - 1) position = "right";
        else if (index === Math.floor(total / 2)) position = "center";
        else position = index < Math.floor(total / 2) ? "left" : "right";
      }
      
      return {
        speaker,
        ...data.character,
        position,
        dialogueIndex: data.dialogueIndex,
      };
    }).sort((a, b) => a.dialogueIndex - b.dialogueIndex);
  }, [scenario]);

  // Get current dialogue
  const currentDialogue = useMemo(() => {
    if (!scenario || dialogueIndex < 0 || dialogueIndex >= scenario.scene.dialogue.length) {
      return null;
    }
    return scenario.scene.dialogue[dialogueIndex];
  }, [scenario, dialogueIndex]);

  // Determine which characters are currently speaking
  const getSpeakingCharacter = () => {
    if (!currentDialogue || !currentDialogue.character) return null;
    return currentDialogue.speaker;
  };

  const speakingCharacter = getSpeakingCharacter();

  // Handle keyboard navigation
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (phase === "intro") {
          setPhase("dialogue");
          setDialogueIndex(0);
        } else if (phase === "dialogue" && scenario) {
          if (dialogueIndex < scenario.scene.dialogue.length - 1) {
            setDialogueIndex((i) => i + 1);
          } else {
            setPhase("choices");
          }
        } else if (phase === "choices" && selectedChoice) {
          setPhase("outcome");
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [phase, dialogueIndex, scenario, selectedChoice]);

  if (!scenario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-10">
          <div className="mb-6">
            <Link to="/scenarios" className="text-sm text-primary flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scenarios
            </Link>
          </div>
          <div className="text-destructive">Scenario not found.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/scenarios">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Scenarios
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {scenario.title}
                </h1>
                <p className="text-sm text-gray-600">
                  {scenario.theme}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="relative min-h-[calc(100vh-6rem)] bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="relative container mx-auto px-4 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Scenario info */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-base text-white/80 text-center"
            >
              {scenario.realCase}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-extrabold mb-2 text-white drop-shadow text-center"
            >
              {scenario.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base mb-8 text-center"
            >
              <span className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg">
                {scenario.theme}
              </span>
            </motion.div>

            {/* TV Scene with Everything Inside */}
            <TVScene backgroundImage={BgScene}>
              <div 
                className="relative h-full w-full flex flex-col"
                style={{
                  minHeight: "clamp(500px, 70vh, 650px)",
                }}
              >
                {/* Character scene - top part with proper spacing and centering */}
                <div 
                  className="relative flex-1 flex items-end justify-center px-4"
                  style={{
                    minHeight: "clamp(200px, 35vh, 300px)",
                    maxHeight: "clamp(200px, 35vh, 300px)",
                    gap: characters.length === 2 
                      ? "clamp(16px, 4vw, 32px)" 
                      : characters.length === 3 
                      ? "clamp(12px, 3vw, 24px)" 
                      : "clamp(8px, 2vw, 16px)",
                    paddingBottom: "clamp(12px, 2vh, 20px)",
                    paddingTop: "clamp(16px, 3vh, 24px)",
                  }}
                >
                  <AnimatePresence mode="sync">
                    {phase === "dialogue" && characters.length > 0 ? (
                      <>
                        {characters.map((char, index) => {
                          // Adjust positioning based on number of characters
                          let flexOrder = 0;
                          if (characters.length === 2) {
                            flexOrder = char.position === "left" ? 0 : 1;
                          } else if (characters.length === 3) {
                            if (char.position === "left") flexOrder = 0;
                            else if (char.position === "center") flexOrder = 1;
                            else flexOrder = 2;
                          } else {
                            flexOrder = index;
                          }

                          return (
                            <motion.div
                              key={char.speaker}
                              style={{ 
                                order: flexOrder,
                                display: "flex",
                                alignItems: "flex-end",
                                justifyContent: "center",
                              }}
                              initial={{ opacity: 0, y: 50, scale: 0.9 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8, y: 30 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                              <AnimatedCharacter
                                character={char}
                                isSpeaking={speakingCharacter === char.speaker}
                                position={char.position}
                                side={char.position === "right" ? "right" : "left"}
                              />
                            </motion.div>
                          );
                        })}
                      </>
                    ) : phase === "intro" ? (
                      <motion.div
                        key="intro-text"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center text-center text-white/90 text-lg font-medium px-6"
                      >
                        <div className="bg-black/50 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                          {scenario.scene.setting}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Content area - bottom part (dialogue, choices, results) */}
                <div className="px-4 pb-4 space-y-3">
                  {/* Start Button (inside TV) */}
                  {phase === "intro" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center"
                    >
                      <Button
                        className="text-sm px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold"
                        onClick={() => {
                          setPhase("dialogue");
                          setDialogueIndex(0);
                        }}
                      >
                        ▶ Start Story
                      </Button>
                    </motion.div>
                  )}

                  {/* Dialogue section */}
                  <AnimatePresence mode="wait">
                    {phase === "dialogue" && currentDialogue && (
                      <motion.div
                        key={`dialogue-${dialogueIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <AnimatedDialogueBox
                          dialogue={currentDialogue}
                          onNext={() => {
                            if (dialogueIndex < scenario.scene.dialogue.length - 1) {
                              setDialogueIndex((i) => i + 1);
                            } else {
                              setPhase("choices");
                            }
                          }}
                          showNext
                          autoPlay
                        />
                      </motion.div>
                    )}

                    {/* Choices question */}
                    {phase === "choices" && (
                      <motion.div
                        key="choices-question"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative w-full"
                      >
                        <div className="absolute -top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-md shadow-lg tracking-wide font-bold text-xs z-10">
                          Your Move
                        </div>
                        <div className="rounded-lg border-2 border-black bg-white/95 p-3 shadow-[0_4px_0_#000]">
                          <p className="text-sm leading-relaxed text-gray-800">
                            {scenario.question}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Choices section */}
                  {phase === "choices" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-2"
                    >
                      {scenario.choices.map((choice, index) => (
                        <motion.div
                          key={choice.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.05 }}
                          className={`border rounded-lg p-2 bg-white/95 cursor-pointer transition-all text-xs ${
                            selectedChoice?.id === choice.id
                              ? "border-primary ring-1 ring-primary/20 shadow-md"
                              : "border-border/20 hover:border-primary/50"
                          }`}
                          onClick={() => setSelectedChoice(choice)}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="text-xs font-medium flex-1">{choice.label}</div>
                            <div className="flex items-center gap-1">
                              <Button
                                variant={selectedChoice?.id === choice.id ? "default" : "secondary"}
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedChoice(choice);
                                }}
                                className="text-xs px-2 py-1 h-6"
                              >
                                {selectedChoice?.id === choice.id ? "✓" : "○"}
                              </Button>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedChoice(choice);
                                  setPhase("outcome");
                                }}
                                className="text-xs px-3 py-1 h-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                              >
                                Go
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      {selectedChoice && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="flex justify-end"
                        >
                          <Button
                            size="sm"
                            onClick={() => setPhase("outcome")}
                            className="text-xs px-4 py-1.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          >
                            Continue ▸
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Outcome section */}
                  {phase === "outcome" && selectedChoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-2"
                    >
                      <div className="rounded-lg border-2 border-black bg-white/95 p-3 shadow-[0_4px_0_#000]">
                        <div className="text-sm font-semibold mb-1">
                          {selectedChoice.outcomeTitle}
                        </div>
                        <p className="text-xs mb-2">{selectedChoice.outcomeDescription}</p>
                        {selectedChoice.isCorrect ? (
                          <div className="text-xs text-emerald-600 font-medium">
                            ✅ Correct - aligns with Supreme Court's position.
                          </div>
                        ) : (
                          <div className="text-xs text-amber-600 font-medium">
                            ⚠️ Consider constitutional limits.
                          </div>
                        )}
                      </div>

                      {/* Real outcome and alternative path - compact */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg border-2 border-black bg-white/95 p-2 shadow-[0_2px_0_#000]">
                          <h3 className="font-semibold text-xs mb-1">Real Outcome</h3>
                          <ul className="list-disc pl-3 space-y-0.5 text-xs">
                            {scenario.realOutcome.map((item, idx) => (
                              <li key={idx} className="leading-tight">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="rounded-lg border-2 border-black bg-white/95 p-2 shadow-[0_2px_0_#000]">
                          <h3 className="font-semibold text-xs mb-1">Alternative</h3>
                          <ul className="list-disc pl-3 space-y-0.5 text-xs">
                            {scenario.alternativePath.map((item, idx) => (
                              <li key={idx} className="leading-tight">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </TVScene>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Link 
                to="/scenarios" 
                className="text-sm text-white/80 flex items-center hover:text-white transition-colors bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-800"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Scenarios
              </Link>
              <Button
                onClick={() => {
                  setSelectedChoice(null);
                  setPhase("intro");
                  setDialogueIndex(-1);
                }}
                variant="outline"
                className="bg-gray-800/50 text-white border-white/20 hover:bg-gray-800 hover:border-white/40"
              >
                🔄 Replay Scenario
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioDetail;
