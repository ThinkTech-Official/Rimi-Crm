import { useRef, useState, useEffect, ChangeEvent, forwardRef, ComponentProps } from "react";
import Calendar from "react-calendar";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-calendar/dist/Calendar.css";
import { toLocalIsoDate } from "../utils/dateUtils";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface DatePickerProps extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  label: string;
  value: string | Date | null | undefined;
  onChange: (value: any) => void;
  maxDate?: Date;
  minDate?: Date;
  isDisabled?: boolean;
  error?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  label,
  value,
  onChange,
  maxDate,
  minDate,
  isDisabled = false,
  error,
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
  const dateWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (dateValue) {
      setInputValue(formatDate(dateValue));
    } else {
      if (!dateWrapperRef.current?.contains(document.activeElement)) {
        setInputValue("");
      }
    }
  }, [value]);

  useOnClickOutside(dateWrapperRef as React.RefObject<HTMLElement>, () => {
    setShowCalendar(false);
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const isDeleting =
      (e.nativeEvent as any)?.inputType?.includes("delete") || false;

    // Clean input: extract only digits up to 8
    let digits = val.replace(/\D/g, "").substring(0, 8);

    // Smart Validation & Auto-correction (only when not deleting)
    if (!isDeleting) {
      // Day validation
      if (digits.length >= 1) {
        const firstDayDigit = parseInt(digits[0], 10);
        if (firstDayDigit > 3) {
          digits = "0" + digits; // e.g. '4' -> '04'
        }
      }
      if (digits.length >= 2) {
        const day = parseInt(digits.substring(0, 2), 10);
        if (day > 31) {
          digits = "31" + digits.substring(2);
        } else if (day === 0 && digits.length === 2) {
          digits = "01" + digits.substring(2);
        }
      }

      // Month validation
      if (digits.length >= 3) {
        const firstMonthDigit = parseInt(digits[2], 10);
        if (firstMonthDigit > 1) {
          digits = digits.substring(0, 2) + "0" + digits.substring(2); // e.g. '13-5' -> '13-05'
        }
      }
      if (digits.length >= 4) {
        const month = parseInt(digits.substring(2, 4), 10);
        if (month > 12) {
          digits = digits.substring(0, 2) + "12" + digits.substring(4);
        } else if (month === 0 && digits.length === 4) {
          digits = digits.substring(0, 2) + "01" + digits.substring(4);
        }
      }
    }

    // Apply robust mask: dd-mm-yyyy
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `${digits.substring(0, 2)}-${digits.substring(2)}`;
    }
    if (digits.length > 4) {
      formatted = `${digits.substring(0, 2)}-${digits.substring(2, 4)}-${digits.substring(4)}`;
    }

    // Use formatted value if not deleting, otherwise respect the user's deletion
    const nextValue = isDeleting ? val : formatted;
    setInputValue(nextValue);

    // Validate the date only if we have a full dd-mm-yyyy string
    const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;
    const match = nextValue.match(dateRegex);

    if (match) {
      const day = parseInt(match[1], 10);
      const month = parseInt(match[2], 10);
      const year = parseInt(match[3], 10);

      const newDate = new Date(year, month - 1, day);

      // Check if the date is actually valid (e.g., not Feb 30)
      if (
        newDate.getFullYear() === year &&
        newDate.getMonth() === month - 1 &&
        newDate.getDate() === day
      ) {
        onChange(toLocalIsoDate(newDate));
      } else {
        onChange(null); // Truly invalid date like Feb 30
      }
    } else if (nextValue === "") {
      onChange(null);
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
          autoComplete="off"
          maxLength={10}
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
              onChange(toLocalIsoDate(date as Date));
              setShowCalendar(false);
            }}
            value={dateValue}
            maxDate={maxDate}
            minDate={minDate}
            onClickDay={() => setShowCalendar(false)}
          />
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

DatePicker.displayName = "DatePicker";

export default DatePicker;
