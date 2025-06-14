import * as React from "react";

const Select = ({
  label,
  required,
  options,
  selected = { name: "" },
  onChange,
}) => {
  return (
    <div className="select-container">
      <label className="select-label">
        {label} {required && <span>*</span>}
      </label>
      <select className="select" onChange={(e) => onChange(e)}>
        {options &&
          options.map((option, index) => {
            return (
              <option
                value={JSON.stringify(option)}
                key={index}
                selected={option.name === selected.name}
              >
                {option.name}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default Select;