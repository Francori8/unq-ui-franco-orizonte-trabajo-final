import { useGameContext } from "../../context/GameContext";

export const EndGame = () => {
  const { score, totalQuestions, dificulty, restart, translatedText } =
    useGameContext();

  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  const getPerformanceColor = () => {
    if (score === totalQuestions) return "text-green-400";
    if (percentage >= 70) return "text-blue-400";
    if (percentage >= 50) return "text-yellow-400";
    return "text-orange-400";
  };

  return (
    <section className="p-4">
      <div className="bg-zinc-900 rounded-3xl p-12 shadow-2xl border-2 border-zinc-700 max-w-2xl w-full">
        <div className="text-center mb-8">
          <p className="text-gray-400 text-lg capitalize">
            {translatedText.dificulty}: {dificulty}
          </p>
        </div>

        <div className="bg-zinc-800 rounded-2xl p-8 mb-8 border-2 border-zinc-700">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-yellow-400 mb-2">
              {score}/{totalQuestions}
            </div>
            <div className={`text-xl font-semibold ${getPerformanceColor()}`}>
              {percentage}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-600">
              <p className="text-gray-400 text-sm mb-1">
                {translatedText.corrects}
              </p>
              <p className="text-green-400 text-3xl font-bold">{score}</p>
            </div>
            <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-600">
              <p className="text-gray-400 text-sm mb-1">
                {translatedText.incorrects}
              </p>
              <p className="text-red-400 text-3xl font-bold">
                {totalQuestions - score}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={restart}
            className="bg-white cursor-pointer text-black hover:bg-gray-200 font-bold py-4 px-8 rounded-full text-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {translatedText.restart}
          </button>
        </div>
      </div>
    </section>
  );
};
