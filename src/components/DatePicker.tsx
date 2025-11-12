import { useRef, useState } from "react";
import Calendar from "react-calendar";
import { AiOutlineCalendar } from "react-icons/ai";
import "react-calendar/dist/Calendar.css";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (value: any) => void;
  maxDate?: Date;
  minDate?: Date;
  isDisabled?: boolean;
}

export default function DatePicker({
  label,
  value,
  onChange,
  maxDate,
  minDate,
  isDisabled = false,
}: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const dateValue = value ? new Date(value) : null;
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const dateRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dateRef as React.RefObject<HTMLElement>, () => {
    setShowCalendar(false);
  });

  return (
    <div className="flex flex-col relative w-full" ref={dateRef}>
      <label className="text-sm mb-1">{label}</label>

      <div className="relative">
        <input
          readOnly
          disabled={isDisabled}
          className="input-primary cursor-pointer pr-10"
          placeholder="Select date"
          value={dateValue ? formatDate(dateValue) : ""}
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
}
