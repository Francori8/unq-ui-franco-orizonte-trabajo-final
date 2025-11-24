import { useGameContext } from "../../context/GameContext";
import { useGetData } from "../../service/useGetData";
import { getQuestion } from "../../service/getQuestion";
import { useEffect, useState } from "react";
import type { Question } from "../../types/question";
import { verifyQuestion } from "../../service/verifyQuestion";
import { StateGames } from "../../types/stateGames";

export const Game = () => {
    const { dificulty, setState, setScore: setContextScore, setTotalQuestions: setContextTotalQuestions } = useGameContext();
    const { getData, data, loading, error } = useGetData<Question[]>( () => getQuestion(dificulty));
    const [question, setQuestion] = useState<Question | undefined>(undefined);
    const [count, setCount] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showFeedback, setShowFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [loadingResult, setLoadingResult] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    
    useEffect(() => {
        getData();
        setCount(0);
        setScore(0);
    }, [dificulty]);
    
    useEffect(() => {
        if (data && data.length > 0) {
            setQuestion(data[count]);
            setShowFeedback(null);
            setSelectedOption(null);
        }
    }, [count, data]);

    // Check if game is over and transition to END state
    useEffect(() => {
        const totalQuestions = data?.length || 0;
        if (totalQuestions > 0 && count >= totalQuestions) {
            // Save results to context
            setContextScore(score);
            setContextTotalQuestions(totalQuestions);
            // Transition to END state
            setState(StateGames.END);
        }
    }, [count, data, score, setState, setContextScore, setContextTotalQuestions]);

    if(loading) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-white text-3xl font-bold animate-pulse">Cargando...</div>
        </div>
    );
    
    if(error) return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="text-red-500 text-2xl">Error: {error}</div>
        </div>
    );

    const handlePlay = async (option: string) => {
        if (loadingResult || showFeedback) return;
        
        setSelectedOption(option);
        setLoadingResult(true);
        
        try {
            const response = await verifyQuestion(question?.id!, option);
            
            if(response.answer){
                setScore(score + 1);
                setShowFeedback('correct');
            } else {
                setShowFeedback('incorrect');
            }
            
            
            setTimeout(() => {
                setLoadingResult(false);
                setCount(count + 1);
            }, 2000);
            
        } catch (error) {
            console.log(error);
            setLoadingResult(false);
        }
    }

    const totalQuestions = data?.length || 0;

    return (
        <section className="bg-linear-90 from-zinc-900 to-zinc-600 rounded-3xl  shadow-2xl border-2 border-zinc-700 p-6 flex flex-col min-w-4/5">
        
            <div className="w-full max-w-4xl mb-8 flex justify-between items-center">
                <div className="bg-zinc-900 rounded-2xl px-6 py-4 border-2 border-zinc-700 shadow-xl">
                    <p className="text-gray-400 text-sm font-medium mb-1">Dificultad</p>
                    <p className="text-white text-2xl font-bold capitalize">{dificulty}</p>
                </div>
                
                <div className="flex md:flex-row flex-col gap-4">
                    <div className="bg-zinc-900 rounded-2xl px-6 py-4 border-2 border-zinc-700 shadow-xl">
                        <p className="text-gray-400 text-sm font-medium mb-1">Pregunta</p>
                        <p className="text-white text-2xl font-bold">{count + 1}/{totalQuestions}</p>
                    </div>
                    
                    <div className="bg-yellow-500 rounded-2xl px-6 py-4 shadow-xl border-2 border-yellow-600">
                        <p className="text-black text-sm font-medium mb-1">Puntaje</p>
                        <p className="text-black text-2xl font-bold">{score}</p>
                    </div>
                </div>
            </div>

            {/* Question Card */}
            {question && (
                <div className="w-full max-w-4xl">
                    <div className="bg-zinc-900 rounded-3xl p-8 shadow-2xl border-2 border-zinc-700 mb-6">
                        <h2 className="text-white text-3xl font-bold text-center leading-relaxed">
                            {question.question}
                        </h2>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['option1', 'option2', 'option3', 'option4'].map((optionKey ) => {
                            const optionValue = question[optionKey as keyof Question] as string;
                            const isSelected = selectedOption === optionKey;
                            
                            return (
                                <button
                                    key={optionKey}
                                    onClick={() => handlePlay(optionKey)}
                                    disabled={loadingResult || showFeedback !== null}
                                    className={`
                                        cursor-pointer
                                        relative overflow-hidden
                                        bg-zinc-800
                                        hover:bg-zinc-700
                                        border-2 border-zinc-600
                                        rounded-2xl p-6 
                                        text-white text-xl font-semibold
                                        transition-all duration-300
                                        transform hover:scale-105 hover:shadow-2xl
                                        disabled:cursor-not-allowed
                                        ${isSelected && showFeedback === 'correct' ? 'bg-green-600 border-green-500 scale-105' : ''}
                                        ${isSelected && showFeedback === 'incorrect' ? 'bg-red-600 border-red-500 scale-95' : ''}
                                        ${!isSelected && showFeedback !== null ? 'opacity-50' : ''}
                                    `}
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-3">
                                        
                                        {optionValue}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                   
                    {showFeedback && (
                        <div className={`
                            mt-8 p-6 rounded-2xl text-center text-2xl font-bold
                            animate-bounce
                            ${showFeedback === 'correct' 
                                ? 'bg-green-600 border-2 border-green-500 text-white' 
                                : 'bg-red-600 border-2 border-red-500 text-white'}
                        `}>
                            {showFeedback === 'correct' ? (
                                <span className="flex items-center justify-center gap-3">
                                 
                                    Correcto
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-3">
                                   
                                    Incorrecto 
                                </span>
                            )}
                        </div>
                    )}

                    {/* Loading Indicator */}
                    {loadingResult && !showFeedback && (
                        <div className="mt-8 text-center">
                            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-zinc-700 border-t-white"></div>
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}
