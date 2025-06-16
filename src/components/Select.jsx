import * as React from "react";

const Select = ({ label, value, required, options, onChange }) => {
  return (
    <div className="select-container">
      <label className="select-label">
        {label} {required && <span>*</span>}
      </label>
      <select value={value} className="select" onChange={(e) => onChange(e)}>
        {options &&
          options.map((option, index) => {
            return (
              <option value={option.value} key={index}>
                {option.label}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;
