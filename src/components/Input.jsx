import * as React from "react";

const Input = ({
  label,
  required,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="input-container">
      <label className="input-label">
        {label} {required && <span>*</span>}
      </label>
      <div className="form-group">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Input;