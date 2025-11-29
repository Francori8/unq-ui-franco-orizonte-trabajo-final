import { createContext, useEffect, useState } from "react";
import { StateGames } from "../types/stateGames";
import textWithIdiom from "../utils/traductor";

interface GameContextType {
  state: StateGames;
  setState: (state: StateGames) => void;
  dificulty: string;
  setDificulty: (dificulty: string) => void;
  result: string;
  setResult: (result: string) => void;
  score: number;
  setScore: (score: number) => void;
  totalQuestions: number;
  setTotalQuestions: (total: number) => void;
  translator: any | null;
  availableTranslator: boolean;
  language: "en" | "es";
  setLanguage: (language: "en" | "es") => void;
  restart: () => void;
  translate: (text: string) => Promise<string>;
  translatedText: any;
}

export const GameContext = createContext<GameContextType | undefined>(
  undefined
);

export const GameContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<StateGames>(StateGames.WAITING);
  const [dificulty, setDificulty] = useState<string>("easy");
  const [result, setResult] = useState<string>("pending");
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [availableTranslator, setAvailableTranslator] =
    useState<boolean>(false);
  const [translator, setTranslator] = useState<any | null>(null);
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [translatedText, setTranslatedText] = useState<any>(textWithIdiom);
  useEffect(() => {
    const initTranslator = async () => {
      try {
        await (window as any).Translator.availability({
          sourceLanguage: "en",
          targetLanguage: "es",
        });
        const translator = await (window as any).Translator.create({
          sourceLanguage: "en",
          targetLanguage: "es",
        });

        setTranslator(translator);
        setAvailableTranslator(true);
      } catch (error) {
        console.error("Error initializing Translation API:", error);
      }
    };

    initTranslator();
  }, []);

  useEffect(() => {
    setTranslatedText(textWithIdiom[language] || textWithIdiom.en);
  }, [language]);

  const restart = () => {
    setState(StateGames.WAITING);
    setDificulty("easy");
    setResult("pending");
    setScore(0);
    setTotalQuestions(0);
    setLanguage("en");
  };

  const translate = async (text: string) => {
    if (!translator || language === "en") return text;
    const translation = await translator.translate(text);
    return translation;
  };

  const value = {
    state,
    setState,
    dificulty,
    setDificulty,
    result,
    setResult,
    score,
    setScore,
    totalQuestions,
    setTotalQuestions,
    translator,
    availableTranslator,
    restart,
    language,
    setLanguage,
    translate,
    translatedText,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { useGameContext } from "../hooks/useGameContext";
