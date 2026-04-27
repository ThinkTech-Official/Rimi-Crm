import { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { UseFormReturn } from 'react-hook-form';

/**
 * Custom hook to re-trigger form validation when the application language changes.
 * This ensures that validation error messages are updated to the correct locale immediately.
 * 
 * @param formMethods - One or more react-hook-form method instances to re-validate.
 */
export const useFormLanguageRevalidation = (...formMethods: UseFormReturn<any>[]) => {
  const { language } = useLanguage();

  useEffect(() => {
    const revalidate = async () => {
      for (const methods of formMethods) {
        if (methods && methods.formState.errors && Object.keys(methods.formState.errors).length > 0) {
          await methods.trigger();
        }
      }
    };

    revalidate();
  }, [language]); // Removed spread to avoid unstable dependency issues in production
};

export default useFormLanguageRevalidation;
