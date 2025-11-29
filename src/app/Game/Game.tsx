import { useGameContext } from "../../context/GameContext";
import { useGetData } from "../../hooks/useGetData";
import { getQuestion } from "../../service/getQuestion";
import { useEffect, useState } from "react";
import type { Question } from "../../types/question";
import { verifyQuestion } from "../../service/verifyQuestion";
import { StateGames } from "../../types/stateGames";

export const Game = () => {
  const {
    dificulty,
    setState,
    setScore: setContextScore,
    setTotalQuestions: setContextTotalQuestions,
    translate,
    language,
    translatedText,
    restart,
  } = useGameContext();
  const { getData, data, loading, error } = useGetData<Question[]>(() =>
    getQuestion(dificulty)
  );
  const [translatedData, setTranslatedData] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question | undefined>(undefined);
  const [count, setCount] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [showFeedback, setShowFeedback] = useState<
    "correct" | "incorrect" | null
  >(null);
  const [loadingResult, setLoadingResult] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  useEffect(() => {
    getData();
    setCount(0);
    setScore(0);
  }, [dificulty]);

  useEffect(() => {
    const translateAllQuestions = async () => {
      if (!data || data.length === 0) return;

      setIsTranslating(true);

      const translated = await Promise.all(
        data.map(async (q) => ({
          ...q,
          translatedQuestion: await translate(q.question),
          translatedOption1: await translate(q.option1),
          translatedOption2: await translate(q.option2),
          translatedOption3: await translate(q.option3),
          translatedOption4: await translate(q.option4),
        }))
      );

      setTranslatedData(translated);
      setIsTranslating(false);
    };

    translateAllQuestions();
  }, [data, language]);

  useEffect(() => {
    if (translatedData && translatedData.length > 0) {
      setQuestion(translatedData[count]);
      setShowFeedback(null);
      setSelectedOption(null);
    }
  }, [count, translatedData]);

  useEffect(() => {
    const totalQuestions = data?.length || 0;
    if (totalQuestions > 0 && count >= totalQuestions) {
      setContextScore(score);
      setContextTotalQuestions(totalQuestions);
      setState(StateGames.END);
    }
  }, [count, data, score, setState, setContextScore, setContextTotalQuestions]);

  if (loading || isTranslating)
    return (
      <div className="min-h-screen min-w-4/5 flex items-center justify-center bg-black">
        <div className="text-white p-10 text-3xl font-bold animate-pulse">
          {loading ? "Cargando..." : "Traduciendo..."}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen min-w-4/5 flex items-center justify-center bg-black">
        <div className="text-red-500 text-2xl">Error: {error}</div>
      </div>
    );

  const handlePlay = async (option: string) => {
    if (loadingResult || showFeedback) return;

    setSelectedOption(option);
    setLoadingResult(true);

    try {
      const response = await verifyQuestion(question?.id!, option);

      if (response.answer) {
        setScore(score + 1);
        setShowFeedback("correct");
      } else {
        setShowFeedback("incorrect");
      }

      setTimeout(() => {
        setLoadingResult(false);
        setCount(count + 1);
      }, 2000);
    } catch (error) {
      console.log(error);
      setLoadingResult(false);
    }
  };

  const totalQuestions = data?.length || 0;

  return (
    <section className="bg-linear-90 from-zinc-900 to-zinc-600 rounded-3xl  shadow-2xl border-2 border-zinc-700 p-6 flex flex-col min-w-4/5">
      <div className="w-full max-w-4xl mb-8 flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <div className="bg-zinc-900 rounded-2xl px-6 py-4 border-2 border-zinc-700 shadow-xl">
            <p className="text-gray-400 text-sm font-medium mb-1">Dificultad</p>
            <p className="text-white text-2xl font-bold capitalize">
              {translatedText[dificulty]}
            </p>
          </div>
          <button
            onClick={restart}
            className="bg-red-700 rounded-2xl px-3 py-2 border-2 border-red-700 text-white font-bold text-sm hover:bg-red-800 hover:cursor-pointer"
          >
            {translatedText.restart}
          </button>
        </div>
        {showFeedback && (
          <div
            className={`
                            p-6 rounded-2xl text-center text-2xl font-bold
                            animate-pulse
                            ${
                              showFeedback === "correct"
                                ? "bg-green-600 border-2 border-green-500 text-white"
                                : "bg-red-600 border-2 border-red-500 text-white"
                            }
                        `}
          >
            {showFeedback === "correct" ? (
              <span className="flex items-center justify-center gap-3">
                {translatedText.correct}
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                {translatedText.incorrect}
              </span>
            )}
          </div>
        )}

        {loadingResult && !showFeedback && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-zinc-700 border-t-white"></div>
          </div>
        )}

        <div className="flex md:flex-row flex-col gap-4">
          <div className="bg-zinc-900 rounded-2xl px-6 py-4 border-2 border-zinc-700 shadow-xl">
            <p className="text-gray-400 text-sm font-medium mb-1">Pregunta</p>
            <p className="text-white text-2xl font-bold">
              {count + 1}/{totalQuestions}
            </p>
          </div>

          <div className="bg-yellow-500 rounded-2xl px-6 py-4 shadow-xl border-2 border-yellow-600">
            <p className="text-black text-sm font-medium mb-1">Puntaje</p>
            <p className="text-black text-2xl font-bold">{score}</p>
          </div>
        </div>
      </div>

      {question && (
        <div className="w-full max-w-4xl">
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-2xl border-2 border-zinc-700 mb-6">
            <h2 className="text-white text-3xl font-bold text-center leading-relaxed">
              {question.translatedQuestion || question.question}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["option1", "option2", "option3", "option4"].map((optionKey) => {
              const optionValue = question[
                optionKey as keyof Question
              ] as string;

              const translatedKey = `translated${optionKey
                .charAt(0)
                .toUpperCase()}${optionKey.slice(1)}` as keyof Question;
              const translatedValue = question[translatedKey];

              const isSelected = selectedOption === optionKey;

              return (
                <button
                  key={optionKey}
                  onClick={() => handlePlay(optionKey)}
                  disabled={loadingResult || showFeedback !== null}
                  className={`
        cursor-pointer
        relative overflow-hidden
        border-2 rounded-2xl p-6 
        text-white text-xl font-semibold
        transition-all duration-300
        transform hover:scale-105 hover:shadow-2xl
        disabled:cursor-not-allowed
        ${
          showFeedback === "correct" && isSelected
            ? "bg-green-600 border-green-500 hover:bg-green-600 scale-105"
            : showFeedback === "incorrect" && isSelected
            ? "bg-red-600 border-red-500 hover:bg-red-600  scale-95"
            : "bg-zinc-800 border-zinc-600 hover:bg-zinc-700  scale-100"
        }
        ${!isSelected && showFeedback !== null ? "opacity-50" : ""}
    `}
                >
                  <span className="relative z-10 capitalize flex items-center justify-center gap-3">
                    {translatedValue || optionValue}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};
