import { ChevronDownIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  info?: () => void;
  options: Option[];
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  info,
  options,
  className = "",
  ...selectProps
}) => (
  <div className="flex flex-col">
    <label className="flex items-center text-text-secondary text-sm">
      {info && (
        <InformationCircleIcon
          onClick={info}
          className="h-5 w-5 text-[#3a17c5] cursor-pointer"
        />
      )}
      {label}
    </label>
    <div className="relative">
      <select
        {...selectProps}
        className={`input-primary appearance-none cursor-pointer ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </div>
    </div>
  </div>
);

export default Dropdown;