import React from "react";
import { useParams, Link } from "react-router-dom";
import { scenarios, type Scenario, type DialogueLine, type Choice } from "./scenarioData";
import { Button } from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import ManPortrait from "../assets/man.svg";
import PolicePortrait from "../assets/police.svg";
import PeoplePortrait from "../assets/people.svg";
import BgScene from "../assets/parliament-building.jpg";

const CharacterBlock: React.FC<{ name: string; active?: boolean; side?: "left" | "right" }> = ({ name, active = false, side = "left" }) => {
  const portraitMap: Record<string, string | undefined> = {
    Kedar: ManPortrait,
    Police: PolicePortrait,
    Villager: PeoplePortrait,
    Lawyer: ManPortrait,
    Narrator: undefined,
  };
  const colorMap: Record<string, string> = {
    Kedar: "bg-blue-500",
    Police: "bg-red-500",
    Villager: "bg-amber-500",
    Lawyer: "bg-emerald-600",
    Narrator: "bg-gray-500",
  };
  const portrait = portraitMap[name];
  const color = colorMap[name] || "bg-gray-500";

  if (portrait) {
    return (
      <img
        src={portrait}
        alt={`${name} portrait`}
        className={`rounded-md object-contain select-none ${active ? "w-80 h-80 drop-shadow-2xl" : "w-56 h-56 opacity-60"} ${side === "left" ? "origin-bottom-left" : "origin-bottom-right"}`}
      />
    );
  }

  return (
    <div className={`w-56 h-56 ${color} rounded-md flex items-center justify-center text-white font-bold ${active ? "" : "opacity-60"}`}>
      {name.charAt(0)}
    </div>
  );
};

const DialogueBox: React.FC<{ speaker: string; text: string; onNext?: () => void; showNext?: boolean }> = ({ speaker, text, onNext, showNext }) => {
  return (
    <div className="relative w-full max-w-5xl mx-auto">
      <div className="absolute -top-6 left-8 bg-black text-white px-5 py-2 rounded-sm shadow-lg tracking-wide font-extrabold text-xl">
        {speaker}
      </div>
      <div className="rounded-xl border-[3px] border-black bg-white/95 p-8 shadow-[0_8px_0_#000]">
        <p className="text-2xl leading-relaxed text-gray-800">{text}</p>
        {showNext && (
          <div className="mt-6 flex justify-end">
            <Button className="text-lg px-6 py-3" onClick={onNext}>Next ▸</Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ScenarioDetail: React.FC = () => {
  const { id } = useParams();
  const scenario: Scenario | undefined = scenarios.find((s) => s.id === id);
  const [selectedChoice, setSelectedChoice] = React.useState<Choice | null>(null);
  const [phase, setPhase] = React.useState<"intro" | "dialogue" | "choices" | "outcome">("intro");
  const [dialogueIndex, setDialogueIndex] = React.useState<number>(-1);

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
        <div className="absolute inset-0" style={{ backgroundImage: `url(${BgScene})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/50 backdrop-blur-[2px]" />
        <div className="relative container mx-auto px-4 py-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-2 text-base text-white/80">{scenario.realCase}</div>
            <h1 className="text-4xl font-extrabold mb-1 text-white drop-shadow">{scenario.title}</h1>
            <div className="text-base mb-6"><span className="px-3 py-1.5 rounded bg-white/20 text-white">{scenario.theme}</span></div>

            <div className="relative h-[60vh] mb-8">
              <div className="absolute bottom-0 left-4">
                <CharacterBlock name="Kedar" active={phase !== "intro" && scenario.scene.dialogue[dialogueIndex]?.speaker === "Kedar"} side="left" />
              </div>
              <div className="absolute bottom-0 right-4">
                <CharacterBlock name="Police" active={phase !== "intro" && scenario.scene.dialogue[dialogueIndex]?.speaker === "Police"} side="right" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-80">
                <CharacterBlock name="Villager" active={phase !== "intro" && scenario.scene.dialogue[dialogueIndex]?.speaker === "Villager"} side="left" />
              </div>
            </div>

            <section className="mb-6">
              {phase === "intro" && (
                <div className="w-full max-w-4xl mx-auto text-center">
                  <div className="text-white/90 mb-4 text-2xl">{scenario.scene.setting}</div>
                  <Button className="text-lg px-6 py-3" onClick={() => { setPhase("dialogue"); setDialogueIndex(0); }}>Start</Button>
                </div>
              )}
              {phase === "dialogue" && (
                <DialogueBox
                  speaker={scenario.scene.dialogue[dialogueIndex]?.speaker || "Narrator"}
                  text={scenario.scene.dialogue[dialogueIndex]?.text || ""}
                  onNext={() => {
                    if (dialogueIndex < scenario.scene.dialogue.length - 1) {
                      setDialogueIndex((i) => i + 1);
                    } else {
                      setPhase("choices");
                    }
                  }}
                  showNext
                />
              )}
              {phase === "choices" && (
                <DialogueBox speaker="Your Move" text={scenario.question} />
              )}
            </section>

            {phase === "choices" && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2 text-white">Your Move</h2>
                <p className="mb-4 text-white/90">{scenario.question}</p>
                <div className="space-y-3">
                  {scenario.choices.map((choice) => (
                    <div key={choice.id} className={`border rounded-lg p-4 bg-white/95 ${selectedChoice?.id === choice.id ? "border-primary ring-2 ring-primary/20" : "border-border"}`}>
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