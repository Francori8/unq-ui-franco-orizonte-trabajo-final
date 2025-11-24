import { createContext, useContext, useState } from "react";
import { StateGames } from "../types/stateGames";

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
  restart: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<StateGames>(StateGames.WAITING);  
  const [dificulty, setDificulty] = useState<string>('easy');  
  const [result, setResult] = useState<string>('pending');
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  
  const restart = () => {
    setState(StateGames.WAITING);
    setDificulty('easy');
    setResult('pending');
    setScore(0);
    setTotalQuestions(0);
  }
  
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
    restart
  }
    
    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};


export const useGameContext = () => {
     const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
