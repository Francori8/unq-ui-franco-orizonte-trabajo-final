import { createContext, useContext, useState } from "react";
import { StateGames } from "../types/stateGames";

const GameContext = createContext({});

export const GameContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<StateGames>(StateGames.WAITING);  
  
  const value = {
    state,
    setState
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
