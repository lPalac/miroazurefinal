import * as React from "react";

const Checkbox = ({
  onSetChecked,
}
) => {
  const [checked, setChecked] = React.useState(false);

  const handleChange = () => {
    setChecked(!checked);
    onSetChecked(!checked);
  };

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        tabIndex={0}
        checked={checked}
        onChange={handleChange}
      />
      <span></span>
    </label>
  );
};

export default Checkbox;