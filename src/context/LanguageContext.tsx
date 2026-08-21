import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { translations, Language, TranslationKey } from '../translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Get from localStorage or default to 'en'
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem('app-language', language);
  }, [language]);

  const t = (key: string, params?: Record<string, string>): string => {
    // If language is 'en', return key itself.
    // If language is 'fr', look up in translations.fr. Fallback to key if missing.
    let text = key;
    if (language === 'fr') {
      const fr = translations.fr as Record<string, string>;
      
      // 1. Exact match (fast path)
      if (fr[key]) {
        text = fr[key];
      } else {
        // 2. Template match (fuzzy matching for dynamic strings from backend)
        // Optimize: only check keys that look like templates
        for (const tplKey in fr) {
          if (tplKey.includes('{{')) {
            // Escape special chars except the placeholders
            const escapedTpl = tplKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
                                     .replace(/\\\{\\\{([a-zA-Z0-9]+)\\\}\\\}/g, '(.+)');
            
            const regex = new RegExp(`^${escapedTpl}$`);
            const match = key.match(regex);
            
            if (match) {
              let translated = fr[tplKey];
              const varNames = [...tplKey.matchAll(/{{([a-zA-Z0-9]+)}}/g)].map(m => m[1]);
              varNames.forEach((name, i) => {
                translated = translated.replace(`{{${name}}}`, match[i+1]);
              });
              return translated;
            }
          }
        }
      }
    }

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), v);
      });
    }

    return text;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}