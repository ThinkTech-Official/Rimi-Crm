import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  info?: () => void;
}
const TextInput: React.FC<TextInputProps> = ({
  label,
  info,
  className = "",
  ...inputProps
}) => (
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
      {...inputProps}
      className={`input-primary`}
    />
  </div>
);

export default TextInput;