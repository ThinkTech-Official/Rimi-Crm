import React from "react";
import { UseFormReturn, useFormContext } from "react-hook-form";
import { generateTestData } from "../../utils/testDataGenerator";
import { BeakerIcon } from "@heroicons/react/24/outline";

interface TestFillButtonProps {
  productName?: string;
  methods?: UseFormReturn<any> | UseFormReturn<any>[];
}

const TestFillButton: React.FC<TestFillButtonProps> = ({ productName, methods }) => {
  // Try to get context, but don't fail if not present (we might pass methods explicitly)
  let contextMethods: any = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    contextMethods = useFormContext();
  } catch (e) {
    // Ignore context if not available
  }

  const handleFill = (e: React.MouseEvent) => {
    e.preventDefault();
    const testData = generateTestData(productName);
    
    const targetMethods = methods 
      ? (Array.isArray(methods) ? methods : [methods])
      : (contextMethods ? [contextMethods] : []);

    if (targetMethods.length === 0) {
      console.warn("TestFillButton: No form methods or context found.");
      return;
    }

    targetMethods.forEach(m => {
      const currentValues = m.getValues();
      m.reset({
        ...currentValues,
        ...testData,
      }, { keepDefaultValues: true });
    });
    
    console.log("Forms auto-filled with test data:", testData);
  };

  return (
    <button
      onClick={handleFill}
      className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100 transition-colors my-4"
      title="Fill form with random test data"
    >
      <BeakerIcon className="w-4 h-4" />
      Auto Fill Test Data
    </button>
  );
};

export default TestFillButton;
