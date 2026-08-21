import { useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useLanguage } from "../context/LanguageContext";
import { Language } from "../translations";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface LanguageDropdownProps {
  className?: string;
}

export default function LanguageDropdown({ className = "" }: LanguageDropdownProps) {
  const { language: selectedLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(dropdownRef as React.RefObject<HTMLElement>, () => {
    setIsOpen(false);
  });

  const handleLanguageSelect = (lang: Language) => {
    if (lang !== selectedLanguage) {
      setLanguage(lang);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="flex items-center gap-1 text-primary font-medium cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex gap-1 items-center">
          <img src="/ion_language.svg" alt="" className="h-4 w-4" />
          {selectedLanguage}
        </span>
        <MdKeyboardArrowRight
          className={`h-4 w-4 transform transition ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-18 rounded-sm shadow-lg bg-white border border-[#E9EEF1] z-[100]">
          <ul className="py-1 text-sm text-gray-700">
            {["en", "fr"].map((lang) => (
              <li key={lang}>
                <button
                  type="button"
                  onClick={() => handleLanguageSelect(lang as Language)}
                  className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white cursor-pointer"
                >
                  {lang}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
