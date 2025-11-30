import { useEffect } from "react";
import { useGameContext } from "../../context/GameContext";
import { getDificulty } from "../../service/getDificulty";
import { useGetData } from "../../hooks/useGetData";
import { StateGames } from "../../types/stateGames";

export const MainMenu = () => {
  const {
    setState,
    setDificulty,
    setLanguage,
    language,
    availableTranslator,
    translatedText,
  } = useGameContext();

  const { getData, data, loading, error } = useGetData<string[]>(getDificulty);

  useEffect(() => {
    getData();
  }, []);

  const handlePlay = (dificulty: string) => {
    setDificulty(dificulty);
    setState(StateGames.PLAYING);
  };

  const getColorDificulty = (dificulty: string) => {
    switch (dificulty) {
      case "easy":
        return "bg-green-800";
      case "normal":
        return "bg-yellow-800";
      case "hard":
        return "bg-red-800";
      case "extreme":
        return "bg-purple-800";
      default:
        return "bg-amber-800";
    }
  };

  const handleLanguage = (language: "en" | "es") => {
    setLanguage(language);
  };

  const isSpanish = language === "es";
  const isEnglish = language === "en";
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="flex flex-col justify-center items-center">
      {availableTranslator && (
        <nav className="flex justify-center items-center gap-2 mb-5">
          <button
            onClick={() => handleLanguage("en")}
            className="bg-amber-800  cursor-pointer hover:bg-amber-900 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isEnglish}
            title={translatedText.english}
          >
            {translatedText.english}
          </button>
          <button
            onClick={() => handleLanguage("es")}
            className="bg-amber-800  cursor-pointer hover:bg-amber-900 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSpanish}
            title={translatedText.spanish}
          >
            {translatedText.spanish}
          </button>
        </nav>
      )}

      <div className="">
        <p className="text-xs text-gray-500 text-pretty">
          {translatedText.paragraph}
        </p>
        <p className="text-xs text-gray-500 text-pretty">
          {translatedText.paragraph2}
        </p>
      </div>

      <h1 className="mb-10 text-2xl">{translatedText.title}</h1>
      {data?.map((item: string) => (
        <div
          className="flex justify-center  items-center py-2 px-4 "
          key={item}
        >
          <button
            className={`${getColorDificulty(
              item
            )} w-3xs cursor-pointer hover:scale-105 transition-all duration-300 text-white font-bold py-2 px-4 rounded`}
            onClick={() => handlePlay(item)}
          >
            <span className="text-xl capitalize">{translatedText[item]}</span>
          </button>
        </div>
      ))}
    </section>
  );
};
