import { AiOutlineLoading } from "react-icons/ai";

export function Button({ onClick, disabled, children, loading, ...other }) {
  return (
    <button
      className="btn df aic jcc"
      onClick={onClick}
      disabled={disabled}
      {...other}
    >
      {loading ? (
        <AiOutlineLoading className="loading-icon" size={20} />
      ) : (
        children
      )}
    </button>
  );
}

export function Input({ onChange, disabled, placeholder, value, ...other }) {
  return (
    <input
      className="custom-input"
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      {...other}
    />
  );
}

export function Checkbox({ onChange, disabled, checked, ...other }) {
  return (
    <input
      type="checkbox"
      onChange={onChange}
      disabled={disabled}
      checked={checked}
      {...other}
    />
  );
}
