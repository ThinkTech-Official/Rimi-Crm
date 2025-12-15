import { useLanguage } from '../context/LanguageContext';
import { Language } from '../translations';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value as Language)}
      className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="en">🇬🇧 English</option>
      <option value="fr">🇫🇷 Français</option>
    </select>
  );
}