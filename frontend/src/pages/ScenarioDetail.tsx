import React from "react";
import { useParams, Link } from "react-router-dom";
import { scenarios, type Scenario, type DialogueLine, type Choice, type Character } from "./scenarioData";
import { Button } from "../components/ui/button";
import { ArrowLeft, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ManPortrait from "../assets/man.svg";
import PolicePortrait from "../assets/police.svg";
import PeoplePortrait from "../assets/people.svg";
import BgScene from "../assets/parliament-building.jpg";

// Generated Character Portrait Component
const GeneratedCharacterPortrait: React.FC<{ character: Character; size?: "small" | "large"; active?: boolean }> = ({ character, size = "large", active = true }) => {
  const sizeClasses = size === "large" ? "w-32 h-32" : "w-16 h-16";
  const activeClasses = active ? "animate-pulse" : "opacity-60";
  
  // Gender-based colors
  const genderColors = {
    male: "from-blue-400 to-blue-600",
    female: "from-pink-400 to-pink-600", 
    child: "from-green-400 to-green-600"
  };
  
  // Age-based sizes
  const ageModifiers = {
    young: "scale-90",
    adult: "scale-100",
    elderly: "scale-95"
  };
  
  // Emotion-based expressions
  const emotionStyles = {
    neutral: "😐",
    angry: "😠",
    sad: "😢", 
    happy: "😊",
    worried: "😟"
  };

  return (
    <div className={`${sizeClasses} ${activeClasses} ${ageModifiers[character.age]} relative`}>
      {/* Background Circle */}
      <div className={`w-full h-full rounded-full bg-gradient-to-br ${genderColors[character.gender]} flex items-center justify-center shadow-lg`}>
        {/* Face */}
        <div className="relative">
          {/* Eyes */}
          <div className="flex justify-center space-x-2 mb-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          {/* Mouth based on emotion */}
          <div className="text-2xl text-white/90">
            {emotionStyles[character.emotion || "neutral"]}
          </div>
        </div>
      </div>
      
      {/* Role Badge */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded text-center whitespace-nowrap">
        {character.role}
      </div>
    </div>
  );
};

const MonitorDialogueBox: React.FC<{ speaker: string; text: string; character?: Character; onNext?: () => void; showNext?: boolean; isPlaying?: boolean; onToggleAudio?: () => void; choices?: Choice[]; selectedChoice?: Choice | null; onChoiceSelect?: (choice: Choice) => void }> = ({ speaker, text, character, onNext, showNext, isPlaying, onToggleAudio, choices, selectedChoice, onChoiceSelect }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Monitor Frame */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-6 shadow-2xl">
        {/* Monitor Screen */}
        <div className="bg-black rounded-lg border-4 border-gray-600 shadow-inner relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          {/* Screen Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-green-800/10">
            {/* Character Portrait */}
            <div className="absolute left-8 top-8">
              {character ? (
                <GeneratedCharacterPortrait character={character} size="large" active={true} />
              ) : (
                <div className="w-32 h-32 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">👤</span>
                </div>
              )}
            </div>
            
            {/* Dialogue Text */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-green-900/80 border-2 border-green-500 rounded-lg p-4">
                <div className="text-green-400 text-lg font-mono mb-2">{speaker}:</div>
                <div className="text-green-300 text-xl font-mono leading-relaxed">{text}</div>
              </div>
            </div>

            {/* Choices Display */}
            {choices && choices.length > 0 && (
              <div className="absolute top-1/2 left-8 right-8 transform -translate-y-1/2">
                <div className="bg-green-900/90 border-2 border-green-500 rounded-lg p-4 space-y-3">
                  <div className="text-green-400 text-lg font-mono mb-3">CHOOSE YOUR RESPONSE:</div>
                  {choices.map((choice) => (
                    <div key={choice.id} className="flex items-center justify-between bg-green-800/50 rounded p-3 border border-green-600">
                      <div className="text-green-300 text-lg font-mono flex-1">{choice.label}</div>
                      <Button
                        onClick={() => onChoiceSelect?.(choice)}
                        className="bg-green-600 hover:bg-green-700 text-white font-mono text-sm px-4 py-2"
                      >
                        CHOOSE
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Scanlines Effect */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="h-full bg-gradient-to-b from-transparent via-green-500/5 to-transparent animate-pulse"></div>
          </div>
        </div>
        
        {/* Monitor Controls */}
        <div className="flex items-center justify-between mt-4 px-2">
          <div className="flex items-center space-x-3">
            <div className="text-xs text-gray-400 font-mono">AUDIO: {isPlaying ? 'PLAYING' : 'STOPPED'}</div>
          </div>
          
          {showNext && (
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white font-mono" 
              onClick={onNext}
            >
              CONTINUE ▸
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const ScenarioDetail: React.FC = () => {
  const { id } = useParams();
  const { user, saveProgress } = useAuth();
  const scenario: Scenario | undefined = scenarios.find((s) => s.id === id);
  const [selectedChoice, setSelectedChoice] = React.useState<Choice | null>(null);
  const [phase, setPhase] = React.useState<"intro" | "dialogue" | "choices" | "outcome">("intro");
  const [dialogueIndex, setDialogueIndex] = React.useState<number>(-1);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const [speechSynth, setSpeechSynth] = React.useState<SpeechSynthesisUtterance | null>(null);
  const [progressSaved, setProgressSaved] = React.useState<boolean>(false);

  // Text-to-Speech functionality with character-based voice selection
  const speakText = (text: string, character?: Character) => {
    if ('speechSynthesis' in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      // Voice selection based on character
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      
      if (character) {
        if (character.gender === "male") {
          selectedVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('male') ||
            voice.name.toLowerCase().includes('david') ||
            voice.name.toLowerCase().includes('alex') ||
            (voice.lang.includes('en-GB') && !voice.name.toLowerCase().includes('female'))
          );
        } else if (character.gender === "female") {
          selectedVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('female') ||
            voice.name.toLowerCase().includes('susan') ||
            voice.name.toLowerCase().includes('zira') ||
            (voice.lang.includes('en-GB') && voice.name.toLowerCase().includes('female'))
          );
        } else if (character.gender === "child") {
          selectedVoice = voices.find(voice => 
            voice.name.toLowerCase().includes('child') ||
            voice.name.toLowerCase().includes('young')
          );
        }
        
        // Adjust pitch based on age
        if (character.age === "young") {
          utterance.pitch = 1.3;
        } else if (character.age === "elderly") {
          utterance.pitch = 0.8;
        }
      }
      
      // Fallback to British voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.includes('en-GB') || 
          voice.name.includes('British') ||
          voice.name.includes('UK')
        );
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      setSpeechSynth(utterance);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else if (scenario && dialogueIndex >= 0 && scenario.scene.dialogue[dialogueIndex]) {
      speakText(scenario.scene.dialogue[dialogueIndex].text);
    }
  };

  // Auto-play audio when dialogue changes
  React.useEffect(() => {
    if (phase === "dialogue" && scenario && dialogueIndex >= 0 && scenario.scene.dialogue[dialogueIndex]) {
      const dialogueLine = scenario.scene.dialogue[dialogueIndex];
      speakText(dialogueLine.text, dialogueLine.character);
    }
  }, [dialogueIndex, phase]);

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

      <main className="relative min-h-[calc(100vh-6rem)]">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
        <div className="relative container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-2 text-base text-white/80">{scenario.realCase}</div>
            <h1 className="text-4xl font-extrabold mb-1 text-white drop-shadow">{scenario.title}</h1>
            <div className="text-base mb-6"><span className="px-3 py-1.5 rounded bg-white/20 text-white">{scenario.theme}</span></div>


            <section className="mb-6">
              {phase === "intro" && (
                <div className="w-full max-w-4xl mx-auto text-center">
                  <div className="text-white/90 mb-4 text-2xl">{scenario.scene.setting}</div>
                  <Button className="text-lg px-6 py-3" onClick={() => { setPhase("dialogue"); setDialogueIndex(0); }}>Start</Button>
                </div>
              )}
              {phase === "dialogue" && (
                <MonitorDialogueBox
                  speaker={scenario.scene.dialogue[dialogueIndex]?.speaker || "Narrator"}
                  text={scenario.scene.dialogue[dialogueIndex]?.text || ""}
                  character={scenario.scene.dialogue[dialogueIndex]?.character}
                  onNext={() => {
                    window.speechSynthesis.cancel();
                    if (dialogueIndex < scenario.scene.dialogue.length - 1) {
                      setDialogueIndex((i) => i + 1);
                    } else {
                      setPhase("choices");
                    }
                  }}
                  showNext
                  isPlaying={isPlaying}
                  onToggleAudio={toggleAudio}
                />
              )}
              {phase === "choices" && (
                <MonitorDialogueBox 
                  speaker="System" 
                  text={scenario.question} 
                  isPlaying={false}
                  onToggleAudio={() => {}}
                  choices={scenario.choices}
                  selectedChoice={selectedChoice}
                  onChoiceSelect={async (choice) => {
                    setSelectedChoice(choice);
                    setPhase("outcome");
                    
                    // Save progress to database
                    if (user && scenario && !progressSaved) {
                      try {
                        await saveProgress(scenario.id, choice.label, choice.isCorrect || false);
                        setProgressSaved(true);
                        console.log('Progress saved successfully!');
                      } catch (error) {
                        console.error('Failed to save progress:', error);
                      }
                    }
                  }}
                />
              )}
            </section>

            {phase === "choices" && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-white">Your Move</h2>
                <p className="mb-4 text-white/90">{scenario.question}</p>
                <div className="space-y-3">
                  {scenario.choices.map((choice) => (
                    <div key={choice.id} className={`border rounded-lg p-4 bg-white/95 ${selectedChoice?.id === choice.id ? "border-primary ring-2 ring-primary/20" : "border-border/20"}`}>
                      <div className="flex items-center justify-between gap-4">
                        <div className="text-base">{choice.label}</div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant={selectedChoice?.id === choice.id ? "default" : "secondary"}
                            onClick={() => { setSelectedChoice(choice); }}
                          >
                            {selectedChoice?.id === choice.id ? "Selected" : "Choose"}
                          </Button>
                          <Button onClick={() => { setSelectedChoice(choice); setPhase("outcome"); }}>
                            Choose & Continue
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedChoice && (
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setPhase("outcome")}>Continue ▸</Button>
                  </div>
                )}
              </section>
            )}

            {phase === "outcome" && selectedChoice && (
              <section className="mb-8">
                <div className="rounded-lg border p-4 bg-white/95">
                  <div className="text-lg font-semibold mb-1">{selectedChoice.outcomeTitle}</div>
                  <p className="mb-3">{selectedChoice.outcomeDescription}</p>
                  {selectedChoice.isCorrect ? (
                    <div className="text-sm text-emerald-600 font-medium">✅ This aligns with the Supreme Court's position in this case.</div>
                  ) : (
                    <div className="text-sm text-amber-600 font-medium">⚠️ Consider constitutional limits and public order principles.</div>
                  )}
                </div>
              </section>
            )}

            {phase === "outcome" && (
              <section className="mb-8 grid md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4 bg-white/95">
                  <h3 className="font-semibold mb-2">Real Outcome ({scenario.realCase.split(' ').pop()})</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {scenario.realOutcome.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border p-4 bg-white/95">
                  <h3 className="font-semibold mb-2">Alternative Path (With Knowledge)</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {scenario.alternativePath.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            <div className="flex items-center justify-between">
              <Link to="/scenarios" className="text-sm text-white/80 flex items-center">
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
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                Replay Scenario
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ScenarioDetail;