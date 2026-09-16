import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translations, type Language, type Translation } from "./translations";

const STORAGE_KEY = "ltc-language";

type LanguageContextValue = {
  lang: Language;
  t: Translation;
  setLang: (lang: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "vi") return stored;
  } catch {
    return "en";
  }
  return window.navigator.language?.toLowerCase().startsWith("vi") ? "vi" : "en";
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    const current = translations[lang];
    document.documentElement.lang = lang;
    document.title = current.meta.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (description) description.content = current.meta.description;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      return;
    }
  }, [lang]);

  const toggleLanguage = useCallback(() => {
    setLang((current) => (current === "en" ? "vi" : "en"));
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, t: translations[lang], setLang, toggleLanguage }),
    [lang, toggleLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function useT() {
  return useLanguage().t;
}