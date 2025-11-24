import { useGameContext } from "../context/GameContext";
import { StateGames } from "../types/stateGames";
import { EndGame } from "./EndGame/EndGame";
import { Game } from "./Game/Game";
import { MainMenu } from "./MainMenu/MainMenu";

export const GameContainer = () => {
    const { state } = useGameContext();
    
    return (
        <main className="flex flex-col  justify-center items-center">
            {state === StateGames.WAITING && <MainMenu />}
            {state === StateGames.PLAYING && <Game />}
            {state === StateGames.END && <EndGame />}
        </main>
    );
}