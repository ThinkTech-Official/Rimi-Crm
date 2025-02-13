import { createContext, useState, useContext } from "react";

interface LangContextType {
  langauge: string;
  setLangauge: React.Dispatch<React.SetStateAction<string>>;
}

export const LangContext = createContext<LangContextType>({
  langauge: "En",
  setLangauge: () => {},
});
export function LangContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [langauge, setLangauge] = useState<string>("En");

  return (
    <LangContext.Provider value={{ langauge, setLangauge }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLangContext = () => useContext(LangContext);
