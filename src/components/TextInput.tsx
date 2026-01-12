import React, { forwardRef, InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  info?: () => void;
}
const TextInput = forwardRef<HTMLInputElement, TextInputProps>(({
  label,
  info,
  className = "",
  ...inputProps
}, ref) => (
  <div className="flex flex-col">
    <label className="text-text-secondary">{label}</label>
    {info && (
      <button
        type="button"
        onClick={info}
        className="self-start text-sm text-blue-500"
      >
        ℹ
      </button>
    )}
    <input
      ref={ref}
      {...inputProps}
      className={`input-primary ${className}`}
    />
  </div>
));

TextInput.displayName = "TextInput";

export default TextInput;