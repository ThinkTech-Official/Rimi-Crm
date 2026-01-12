import { useRef, useState, useEffect, ChangeEvent, forwardRef, ComponentProps } from "react";
import Calendar from "react-calendar";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-calendar/dist/Calendar.css";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface DatePickerProps extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  label: string;
  value: string | Date;
  onChange: (value: any) => void;
  maxDate?: Date;
  minDate?: Date;
  isDisabled?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  label,
  value,
  onChange,
  maxDate,
  minDate,
  isDisabled = false,
  className,
  ...props
}, ref) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const dateValue = value ? new Date(value) : null;
  
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (dateValue) {
      setInputValue(formatDate(dateValue));
    } else {
      setInputValue("");
    }
  }, [value]);

  const dateWrapperRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dateWrapperRef as React.RefObject<HTMLElement>, () => {
    setShowCalendar(false);
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    const isDeleting = (e.nativeEvent as any).inputType === "deleteContentBackward";
    
    if (isDeleting) {
      setInputValue(val);
      return;
    }

    // Remove all non-numeric characters for processing
    const digits = val.replace(/\D/g, "");
    
    let formatted = "";
    let i = 0;

    // Smart Day segment
    if (i < digits.length) {
      let char = digits[i];
      if (parseInt(char) > 3) {
        formatted += "0" + char + "-";
        i++;
      } else {
        formatted += char;
        i++;
        if (i < digits.length) {
          formatted += digits[i] + "-";
          i++;
        }
      }
    }

    // Smart Month segment
    if (i < digits.length) {
      let char = digits[i];
      if (parseInt(char) > 1) {
        formatted += "0" + char + "-";
        i++;
      } else {
        formatted += char;
        i++;
        if (i < digits.length) {
          formatted += digits[i] + "-";
          i++;
        }
      }
    }

    // Year segment (up to 4 digits)
    if (i < digits.length) {
      formatted += digits.substring(i, i + 4);
    }
    
    setInputValue(formatted);

    // Strict regex for dd-mm-yyyy with simple limits (01-31, 01-12, 1900-2099)
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = formatted.match(regex);

    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);

      const newDate = new Date(year, month - 1, day);

      if (
        newDate.getFullYear() === year &&
        newDate.getMonth() === month - 1 &&
        newDate.getDate() === day
      ) {
         if (minDate && newDate < minDate) return; 
         if (maxDate && newDate > maxDate) return;

         onChange(newDate);
      }
    }
  };

  return (
    <div className="flex flex-col relative w-full" ref={dateWrapperRef}>
      <label className="text-sm text-text-secondary">{label}</label>

      <div className="relative">
        <input
          {...props}
          ref={ref}
          disabled={isDisabled}
          className={`input-primary cursor-pointer pr-10 ${className || ''}`}
          placeholder="dd-mm-yyyy"
          value={inputValue}
          onChange={handleInputChange}
          onClick={() => setShowCalendar(!showCalendar)}
        />
        <AiOutlineCalendar
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          size={20}
          onClick={() => setShowCalendar(!showCalendar)}
        />
      </div>

      {showCalendar && !isDisabled && (
        <div className="absolute top-full mt-1 z-50 bg-white shadow-md rounded-lg">
          <Calendar
            onChange={(date) => {
              onChange(date as Date);
              setShowCalendar(false);
            }}
            value={dateValue}
            maxDate={maxDate}
            minDate={minDate}
            onClickDay={() => setShowCalendar(false)}
          />
        </div>
      )}
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
