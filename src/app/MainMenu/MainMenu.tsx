import { useEffect } from "react";
import { useGameContext } from "../../context/GameContext";
import { getDificulty } from "../../service/getDificulty";
import { useGetData } from "../../service/useGetData";
import { StateGames } from "../../types/stateGames";

export const MainMenu = () => {
    const { setState, setDificulty } = useGameContext();
    
    const { getData, data, loading, error } = useGetData<string[]>(getDificulty);

    useEffect(() => {
        getData();
    }, []);

    const handlePlay = (dificulty: string) => {
        setDificulty(dificulty);
        setState(StateGames.PLAYING);
    }

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error: {error}</p>
    
    return (
        <section className="flex flex-col justify-center items-center">
            <h1 className="mb-10 text-2xl">Questions</h1>
            {data?.map((item: string) => (
                <div className="flex justify-center  items-center py-2 px-4 " key={item}>
                <button className="bg-amber-800 w-3xs cursor-pointer hover:bg-amber-900 text-white font-bold py-2 px-4 rounded" onClick={() => handlePlay(item)}><span className="text-2xl capitalize">{item}</span></button>
            </div>               
            ))}
        </section>
    );
}