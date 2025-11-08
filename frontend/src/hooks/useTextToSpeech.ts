import { useState, useCallback, useRef, useEffect } from "react";

interface UseTextToSpeechOptions {
  rate?: number; // Speech rate (0.1 to 10)
  pitch?: number; // Speech pitch (0 to 2)
  volume?: number; // Speech volume (0 to 1)
  voice?: SpeechSynthesisVoice | null;
}

interface UseTextToSpeechReturn {
  speak: (text: string, options?: UseTextToSpeechOptions) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  availableVoices: SpeechSynthesisVoice[];
  getVoiceForCharacter: (gender: "male" | "female" | "child", age?: "young" | "adult" | "elderly") => SpeechSynthesisVoice | null;
}

export const useTextToSpeech = (): UseTextToSpeechReturn => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Get appropriate voice for character
  const getVoiceForCharacter = useCallback((
    gender: "male" | "female" | "child",
    age: "young" | "adult" | "elderly" = "adult"
  ): SpeechSynthesisVoice | null => {
    if (availableVoices.length === 0) return null;

    // Filter voices by gender
    const genderVoices = availableVoices.filter((voice) => {
      const voiceName = voice.name.toLowerCase();
      if (gender === "female") {
        return voiceName.includes("female") || 
               voiceName.includes("woman") || 
               voiceName.includes("zira") ||
               voiceName.includes("samantha") ||
               voiceName.includes("karen") ||
               voiceName.includes("susan");
      } else if (gender === "child") {
        return voiceName.includes("child") || 
               voiceName.includes("kids") ||
               (voiceName.includes("female") && age === "young");
      } else {
        return voiceName.includes("male") || 
               voiceName.includes("man") || 
               voiceName.includes("david") ||
               voiceName.includes("mark") ||
               voiceName.includes("richard") ||
               (!voiceName.includes("female") && !voiceName.includes("woman") && !voiceName.includes("zira") && !voiceName.includes("samantha"));
      }
    });

    // Filter by language (prefer English voices)
    const englishVoices = genderVoices.filter((voice) => 
      voice.lang.startsWith("en")
    );

    // Prefer local voices over remote
    const localVoices = (englishVoices.length > 0 ? englishVoices : genderVoices).filter(
      (voice) => voice.localService
    );

    // Select based on age
    if (age === "elderly") {
      // Prefer deeper, slower voices for elderly
      return localVoices[0] || englishVoices[0] || genderVoices[0] || availableVoices[0];
    } else if (age === "young" || gender === "child") {
      // Prefer higher-pitched voices for young/children
      const youngVoices = (localVoices.length > 0 ? localVoices : englishVoices.length > 0 ? englishVoices : genderVoices).filter(
        (voice) => voice.name.toLowerCase().includes("high") || 
                   voice.name.toLowerCase().includes("kid") ||
                   voice.name.toLowerCase().includes("child")
      );
      return youngVoices[0] || localVoices[0] || englishVoices[0] || genderVoices[0] || availableVoices[0];
    }

    return localVoices[0] || englishVoices[0] || genderVoices[0] || availableVoices[0];
  }, [availableVoices]);

  const speak = useCallback((text: string, options?: UseTextToSpeechOptions) => {
    // Stop any current speech
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);

    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice
    if (options?.voice) {
      utterance.voice = options.voice;
    }

    // Set speech parameters
    utterance.rate = options?.rate ?? 0.9;
    utterance.pitch = options?.pitch ?? 1;
    utterance.volume = options?.volume ?? 1;

    // Event handlers
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utterance.onerror = (error) => {
      console.error("Speech synthesis error:", error);
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
  }, []);

  const pause = useCallback(() => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, [isSpeaking, isPaused]);

  const resume = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, [isPaused]);

  return {
    speak,
    stop,
    pause,
    resume,
    isSpeaking,
    isPaused,
    availableVoices,
    getVoiceForCharacter,
  };
};

